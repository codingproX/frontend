import React, { useState } from "react";

const FileUpload = ({ onTextExtracted }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // Clear any previous error messages
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setError(""); // Reset error before starting the upload

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // eslint-disable-next-line no-template-curly-in-string
        throw new Error('Upload failed: ${response.statusText}');
      }

      const data = await response.json();
      if (data.extracted_text) {
        onTextExtracted(data.extracted_text);
      } else {
        throw new Error("No extracted text received from the server.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="file-upload">
      <h2>Upload Your File</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf, .png, .jpg, .jpeg" />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;