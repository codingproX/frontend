import React, { useState } from "react";
import FileUpload from "./FileUpload";
import "./App.css";
const BACKEND_URL = "https://backend-xia8.onrender.com";

function App() {
  const [extractedText, setExtractedText] = useState("");

  const handleTextExtracted = (text) => {
    setExtractedText(text);
  };

  return (
    <div className="App">
      <header>
        <h1>Social Media Content Analyzer</h1>
        <p>Analyze your social media posts for better engagement!</p>
      </header>
      <FileUpload onTextExtracted={handleTextExtracted} />
      {extractedText && (
        <div className="text-extraction-result">
          <h2>Extracted Text</h2>
          <p>{extractedText}</p>
        </div>
      )}
      <footer>© 2025 Social Media Analyzer | Designed with ❤</footer>
    </div>
  );
}

export default App;