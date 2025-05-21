import React, { useState } from "react";
import UploadBtn from "./components/uploadBtn";
import Axios from "axios";
import "./App.css";
import ChatPan from "./components/chatPan";
interface FileChangeHandler {
  handleFileChange: (file: File | undefined) => void;
}

function App(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleFileChange = async (file: File | undefined): Promise<void> => {
    if (file) {
      if (file.type === "application/pdf") {
        setLoading(true);
        setSuccessMessage("");
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        try {
          const response = await Axios.post(
            "http://localhost:8000/chat/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            setLoading(false);
            setSuccessMessage("File uploaded successfully!");
            setError("");
          } else {
            setError("Error uploading file");
            setLoading(false);
            setSuccessMessage("");
          }
        } catch (err) {
          setError("Error uploading file");
          setLoading(false);
          setSuccessMessage("");
        }
      } else {
        setError("Please upload a PDF file only");
        setSuccessMessage("");
      }
    } else {
      setError("");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div>
        <p className="text-center text-5xl font-bold text-cyan-500 text-shadow-lg">
          Click on Upload Button to Upload your PDF file
        </p>
        <div className="mx-auto flex flex-col items-center py-6">
          <UploadBtn handleFileChange={handleFileChange} loading={loading} />
          {error && <p className="mt-2 text-red-500 font-medium">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-green-500 font-medium">{successMessage}</p>
          )}
        </div>
        <ChatPan enable={true} />
      </div>
    </>
  );
}

export default App;
