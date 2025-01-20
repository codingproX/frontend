
import React, { useState } from "react";

const FileUpload = ({ onTextExtracted, backendUrl }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const allowedFileTypes = ["application/pdf", "image/png", "image/jpeg"];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!allowedFileTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload a PDF or image file.");
      return;
    }
    setFile(selectedFile);
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
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
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
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .png, .jpg, .jpeg"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
