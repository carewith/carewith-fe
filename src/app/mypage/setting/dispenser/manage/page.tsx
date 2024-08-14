"use client";
import styled from "styled-components";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DispenserWithStatus, getMainDispenser } from "@/service/dispenser";

function ManageDispenser() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCaution, setIsCaution] = useState(false);
  const [mainDispenser, setMainDispenser] = useState<any>(null);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleCaution = () => {
    setIsCaution(!isCaution);
  };
  useEffect(() => {
    const fetchDispenser = async () => {
      try {
        const response = await getMainDispenser();
        setMainDispenser(response);
      } catch (error) {
        console.error("Dispenser not found:", error);
      }
    };
    fetchDispenser();
  }, []);
  return (
    <SettingContainer>
      <SettingHeader title="디스펜서 관리" />
      <SectionTitle>설정</SectionTitle>
      <ContentSection>
        <SettingItem onClick={toggleModal}>
          <div>
            <Label>디스펜서</Label>
            <Value>{mainDispenser?.name || "디스펜서1"}</Value>
          </div>
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
        <SettingItem>
          <div>
            <Label>디스펜서 일련번호</Label>
            <Value>
              {mainDispenser?.dispenserId ||
                localStorage.getItem("dispenserId") ||
                "MJeo0ld"}
            </Value>
          </div>
          <CopyButton>복사</CopyButton>
        </SettingItem>
      </ContentSection>
      <SectionTitle>디스펜서 등록 및 전환</SectionTitle>
      <ContentSection>
        <SettingItem onClick={toggleCaution}>
          복용 알림음
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
      </ContentSection>
      <DispenserInfoSection>
        <DispenserName>사용자 지정 이름</DispenserName>
        <DispenserButton onClick={toggleCaution}>디스펜서 선택</DispenserButton>
        <DispenserButton onClick={toggleCaution} outlined>
          디스펜서 삭제
        </DispenserButton>
      </DispenserInfoSection>
      <AddDispenserButton
        onClick={() => router.push("/mypage/setting/dispenser/choice")}
      >
        + 추가 디스펜서 등록
      </AddDispenserButton>

      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalTitle>디스펜서명</ModalTitle>
            <InputWrapper>
              <Input type="text" placeholder="디스펜서명 입력" />
            </InputWrapper>
            <ModalButton>완료</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
      {isCaution && (
        <ModalOverlay onClick={toggleCaution}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalTitle>준비중인 기능입니다</ModalTitle>
            <ModalButton onClick={toggleCaution}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </SettingContainer>
  );
}

export default ManageDispenser;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.grey.background};
`;

const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin: 14px 0 8px 8px;
`;

const ContentSection = styled.section`
  background-color: white;
  border-radius: 24px;
  padding: 8px 16px;
  margin-bottom: 16px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};

  &:last-child {
    border-bottom: none;
  }

  > div {
    display: flex;
    flex-direction: column;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey01};
`;

const Value = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-top: 4px;
`;

const CopyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

const DispenserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const DispenserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const DispenserName = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
`;

const DispenserButton = styled.button<{ outlined?: boolean }>`
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ outlined, theme }) =>
    outlined ? "white" : theme.colors.primary.blue02};
  color: ${({ outlined, theme }) =>
    outlined ? theme.colors.grey.grey01 : "white"};
  border: ${({ outlined, theme }) =>
    outlined ? `1px solid ${theme.colors.grey.grey03}` : "none"};
`;

const AddDispenserButton = styled(DispenserButton)`
  background-color: white;
  color: ${({ theme }) => theme.colors.primary.blue02};
  border: 1px solid ${({ theme }) => theme.colors.primary.blue02};
  margin-top: 16px;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 20px;
`;

const ModalHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 2px;
  margin: 0 auto 20px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 8px;
  font-size: 16px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
`;
