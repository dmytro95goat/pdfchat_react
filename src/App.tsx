import React, { useState } from "react";
import UploadBtn from "./components/uploadBtn";
import "./App.css";

interface FileChangeHandler {
  handleFileChange: (file: File | undefined) => void;
}

function App(): React.ReactElement {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (file: File | undefined): void => {
    if (file) {
      if (file.type === "application/pdf") {
        setUploadedFile(file);
        setError("");
        setLoading(true);
      } else {
        setError("Please upload a PDF file only");
        setUploadedFile(null);
      }
    } else {
      setUploadedFile(null);
      setError("");
    }
    console.log(uploadedFile);
  };

  return (
    <>
      <div>
        <p className="text-center text-5xl font-bold text-cyan-500 text-shadow-lg">
          Click on Upload Button to Uplaod your PDF file
        </p>
        <div className="mx-auto flex flex-col items-center py-6">
          <UploadBtn handleFileChange={handleFileChange} loading={loading} />
          {error && <p className="mt-2 text-red-500 font-medium">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
