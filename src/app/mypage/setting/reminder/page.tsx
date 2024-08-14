"use client";
import styled from "styled-components";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { IoChevronForward, IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";

import { useRouter } from "next/navigation";
import {
  ModalButton,
  ModalContent,
  ModalHandle,
  ModalOverlay,
  ModalTitle,
} from "@/components/mypage/myPage.styles";

function ReminderPage() {
  const [alarmOn, setAlarmOn] = useState(true);
  const [takeAlarmOn, setTakeAlarmOn] = useState(false);
  const [missedAlarmOn, setMissedAlarmOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const router = useRouter();
  return (
    <SettingContainer>
      <SettingHeader title="알림 설정" />
      <SectionTitle>알림 수신 설정</SectionTitle>
      <ContentSection>
        <SettingItem>
          <div>알림 수신 설정</div>
          <ToggleSwitch
            checked={alarmOn}
            onChange={() => setAlarmOn(!alarmOn)}
          />
        </SettingItem>
        <SettingItem>
          <div>복용 확인 알림</div>
          <ToggleSwitch
            checked={takeAlarmOn}
            onChange={() => setTakeAlarmOn(!takeAlarmOn)}
          />
        </SettingItem>
        <SettingItem>
          <div>
            미복용 반복 알림
            <InfoIcon />
          </div>
          <ToggleSwitch
            checked={missedAlarmOn}
            onChange={() => setMissedAlarmOn(!missedAlarmOn)}
          />
        </SettingItem>
        <SettingItem>
          <div>알림음 설정</div>
          <RightContent onClick={toggleModal}>
            기본음
            <IoChevronForward color="#2c2d31" size={20} />
          </RightContent>
        </SettingItem>
      </ContentSection>
      <BottomMessage>
        디스펜서 알림음은{" "}
        <UnderlinedText
          onClick={() => router.push("/mypage/setting/dispenser/manage")}
        >
          디스펜서 관리
        </UnderlinedText>
        에서 변경할 수 있습니다.
      </BottomMessage>
      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalTitle>준비중인 기능입니다</ModalTitle>
            <ModalButton onClick={toggleModal}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </SettingContainer>
  );
}

export default ReminderPage;

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
  margin: 0px 0 8px 8px;
`;

const ContentSection = styled.section`
  background-color: white;
  border-radius: 24px;
  padding: 8px 16px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-size: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};

  &:last-child {
    border-bottom: none;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-size: 14px;
`;

const InfoIcon = styled(IoInformationCircleOutline)`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.grey.grey02};
`;

const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 50px;
  height: 30px;
  background-color: ${({ checked, theme }) =>
    checked ? theme.colors.primary.blue02 : "#e0e0e0"};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ checked }) => (checked ? "22px" : "2px")};
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s;
  }
`;

const BottomMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  text-align: center;
  margin-top: 24px;
`;

const UnderlinedText = styled.span`
  text-decoration: underline;
`;
