import React from "react";
import "./ShowCorrected.scss";

type Props = { text: string | null };
// interface Props {
//   text: string | null;
// }
const ShowCorrected = ({ text }: Props) => (
  <div className="corrected-text">{text}</div>
);
export default ShowCorrected;
