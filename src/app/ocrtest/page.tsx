"use client";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64String = result.replace("data:", "").replace(/^.+,/, "");

        try {
          const response = await fetch("/api/vision", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64String }),
          });

          const data = await response.json();
          setOcrText(data.text);
        } catch (error) {
          console.error("Error during OCR process:", error);
          setOcrText("Failed to extract text");
        }
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <h1>OCR with Google Cloud Vision API</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload and Extract Text</button>
      </form>
      {ocrText && (
        <div>
          <h2>Extracted Text</h2>
          <p>{ocrText}</p>
        </div>
      )}
    </div>
  );
}
