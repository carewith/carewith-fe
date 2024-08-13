"use client";

import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { MdCheckCircle, MdQrCodeScanner } from "react-icons/md";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 80%;
  width: 300px;
`;

const ModalTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
`;

const ModalText = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: #4caf50;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DisplayBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 768px;
`;

export default function QrScanner() {
  const [data, setData] = useState<string>("조회된 데이터 없음");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const qrScan = (result: string) => {
    setData(result);
    setIsModalOpen(true);
  };

  const qrErr = (err: Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        router.push(`/mypage/setting/dispenser/choice/regist/${data}`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen, data, router]);

  return (
    <DisplayBox>
      <QrReader
        onResult={(res: any, err: any) => {
          if (res) qrScan(res.getText());
          if (err) qrErr(err);
        }}
        constraints={{ facingMode: "environment" }}
        containerStyle={{ width: "300px", height: "300px" }}
      />
      <div>
        <IconWrapper>
          <MdQrCodeScanner />
        </IconWrapper>
      </div>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <IconWrapper>
              <MdCheckCircle />
            </IconWrapper>
            <ModalTitle>QR 코드 인식 성공!</ModalTitle>
            <ModalText>잠시 후 페이지가 이동됩니다.</ModalText>
            <LoadingSpinner />
          </ModalContent>
        </ModalOverlay>
      )}
    </DisplayBox>
  );
}
