"use client";
import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const OcrPage = () => {
  const [text, setText] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const captureImage = (): string | undefined => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
      }
    }
    return undefined;
  };

  const handleOcr = async () => {
    const imageData = captureImage();
    if (imageData) {
      const {
        data: { text },
      } = await Tesseract.recognize(imageData, "eng", {
        logger: (m) => console.log(m),
      });
      setText(text);
    } else {
      console.error("Failed to capture image for OCR.");
    }
  };

  return (
    <div>
      <h1>OCR 테스트 페이지</h1>
      <video ref={videoRef} style={{ width: "100%", maxHeight: "300px" }} />
      <button onClick={startCamera}>카메라 시작</button>
      <button onClick={handleOcr}>사진 찍고 OCR 수행</button>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      ></canvas>
      {text && (
        <div>
          <h2>인식된 텍스트:</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default OcrPage;
