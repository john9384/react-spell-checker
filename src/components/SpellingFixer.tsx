import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ShowCorrected from "./ShowCorrected";

type Props = { corpus: string };

const SpellingFixer = ({ corpus }: Props) => {
  const [corrected, setCorrected] = useState<string | null>(null);
  const arr_of_text = corpus.split(" ");
  const is_misspelled = async (word: string) => {
    try {
      const response = await axios.get(`${url}/misspelled?word=${word}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const correct_word = async (misspelled: string) => {
    try {
      const response = await axios.get(`${url}/corrections?word=${misspelled}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const corrected_string = async () => {
    try {
      const corrected_arr = [];
      for (let i = 0; i < arr_of_text.length; i++) {
        const word_check = await is_misspelled(arr_of_text[i]);
        if (word_check.mispelled) {
          const guess: any = await correct_word(arr_of_text[i]);
          corrected_arr.push(guess.corrections[0]);
        } else {
          corrected_arr.push(arr_of_text[i]);
        }
      }
      const correct_sentence = corrected_arr.join(" ");
      setCorrected(correct_sentence);
    } catch (error) {
      console.log(error);
    }
  };
  const url =
    "https://us-east1-serverless-306422.cloudfunctions.net/spellchecker";
  corrected_string();
  useEffect(() => {
    corrected_string();
  });
  return (
    <div>
      {corrected === null ? (
        <LoadingSpinner />
      ) : (
        <ShowCorrected text={corrected} />
      )}
    </div>
  );
};

export default SpellingFixer;
