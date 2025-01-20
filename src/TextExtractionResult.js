import React from "react";
import "./App.css";

function TextExtractionResult({ text }) {
  return (
    <div className="text-extraction-result">
      <h2>Extracted Text</h2>
      <p>{text}</p>
    </div>
  );
}

export default TextExtractionResult;
