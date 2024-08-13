"use client";
import styled from "styled-components";
import TodayMediblockList from "./MediblockList";
import { getMainDispenser } from "@/service/dispenser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../common/ModalContainer";

const ContentContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 325px;
  left: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: calc(100vh - 350px);
  background-color: #fbfcff;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  padding-top: 2.5rem;
  overflow-y: auto;
`;
const Title = styled.h1`
  font-size: 27px;
  line-height: 32px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDispenser = async () => {
      try {
        const response = await getMainDispenser();
        localStorage.setItem("dispenserId", response.dispenserId);
      } catch (error) {
        console.error("Dispenser not found:", error);
        setShowModal(true);
      }
    };

    fetchDispenser();
  }, []);

  const handleRegisterDispenser = () => {
    router.push("/mypage/setting/dispenser/choice");
  };

  return (
    <ContentContainer>
      <Title>금일 복용 약 목록</Title>
      <TodayMediblockList />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="기기 등록 필요"
          content="복약 관리를 위해 기기 등록이 필요합니다."
          confirmText="등록하러 가기"
          onConfirm={handleRegisterDispenser}
        />
      )}
    </ContentContainer>
  );
};

export default Content;
