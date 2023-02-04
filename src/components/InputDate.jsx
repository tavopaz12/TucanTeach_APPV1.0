import React from "react";
import '../styles/InputDate.scss'

export default function InputDate({value}) {
  return <input value={value} className="input__date" type="date" />;
}
