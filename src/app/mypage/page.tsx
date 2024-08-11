"use client";
import styled from "styled-components";
import {
  IoChevronForward,
  IoSettingsOutline,
  IoHeadset,
} from "react-icons/io5";
import { PiUserList } from "react-icons/pi";
import { useState } from "react";

const MyPage = () => {
  const patientInfo = {
    name: "김태완",
    birth: "2001-02-22",
    diseaseName: "알츠하이머",
    since: "2019-03-02",
    severity: 2,
  };

  const [isLargeText, setIsLargeText] = useState(false);

  const handleToggleLargeText = () => {
    setIsLargeText(!isLargeText);
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileInfo>
          <ProfileImage src="/images/profile.png" alt="프로필 사진" />
          <div>
            <UserName>아이디</UserName>
            <UserContact>연락처</UserContact>
          </div>
          <EditProfileButton>프로필 수정</EditProfileButton>
        </ProfileInfo>
      </ProfileSection>

      <PatientCard>
        <PatientInfo>
          <PatientImage src="/images/profile.png" alt="환자 사진" />
          <PatientDetails>
            <PatientName>{patientInfo.name}</PatientName>
            <PatientDetailText>
              <Category>여</Category>
              <Content>{patientInfo.birth}</Content>
            </PatientDetailText>
            <PatientDetailText>
              <Category>질병</Category>
              <Content>{patientInfo.diseaseName}</Content>
            </PatientDetailText>
            <PatientDetailText>
              <Category>진단 날짜</Category>
              <Content>{patientInfo.since}</Content>
            </PatientDetailText>
            <PatientDetailText>
              <Category>중증도</Category>
              <Content>중간단계</Content>
            </PatientDetailText>
          </PatientDetails>
        </PatientInfo>
        <ActionButtons>
          <ActionButton>기기 전환</ActionButton>
          <ActionButton>복용약 보기</ActionButton>
        </ActionButtons>
      </PatientCard>

      <NavigationMenu>
        <NavItem>
          <PiUserList size={24} />
          <NavText>환자 관리</NavText>
        </NavItem>
        <Divider />
        <NavItem>
          <IoSettingsOutline size={24} />
          <NavText>기기 관리</NavText>
        </NavItem>
        <Divider />
        <NavItem>
          <IoHeadset size={24} />
          <NavText>고객센터</NavText>
        </NavItem>
      </NavigationMenu>

      <SettingsSection>
        <SettingsTitle>설정</SettingsTitle>
        <SettingItem>
          계정 및 프로필 관리
          <IoChevronForward />
        </SettingItem>
        <SettingItem>
          기기 관리
          <IoChevronForward />
        </SettingItem>
        <SettingItem>
          알림 설정
          <IoChevronForward />
        </SettingItem>
        <InfoSectionRow>
          <span>큰 글씨</span>
          <span onClick={handleToggleLargeText}>
            <input type="checkbox" checked={isLargeText} readOnly />
            <div className="toggle-switch"></div>
          </span>
        </InfoSectionRow>
        <SettingItem>
          앱 정보
          <IoChevronForward />
        </SettingItem>
      </SettingsSection>

      <SupportSection>
        <SettingsTitle>고객지원</SettingsTitle>
        <SettingItem>
          구독 및 결제 관리
          <IoChevronForward />
        </SettingItem>
        <SettingItem>
          공지사항
          <IoChevronForward />
        </SettingItem>
        <SettingItem>
          이용약관
          <IoChevronForward />
        </SettingItem>
        <SettingItem>
          고객센터
          <IoChevronForward />
        </SettingItem>
      </SupportSection>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grey.background};
`;

const ProfileSection = styled.section`
  padding: 16px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

const UserName = styled.h2`
  font-size: 17px;
  font-weight: 500;
  margin: 0;
`;

const UserContact = styled.p`
  font-size: 11px;
  color: black;
`;

const EditProfileButton = styled.button`
  background-color: white;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-weight: 400;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const PatientCard = styled.section`
  background-color: white;
  border-radius: 1.5rem;
  padding: 16px;
  margin-bottom: 1.5rem;
`;

const PatientInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PatientImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1.5rem;
`;

const PatientDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PatientName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: black;
`;

const PatientDetailText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: black;
`;

const Category = styled.span`
  font-weight: 500;
  color: black;
  margin-right: 8px;
`;

const Content = styled.span`
  color: black;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  background-color: white;
  color: ${({ theme }) => theme.colors.grey.grey01};
  padding: 8px 12px;
  font-weight: 400;
  border-radius: 8px;
  cursor: pointer;
  width: 48%;
`;

const NavigationMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  border-radius: 24px;
  padding: 22px 1rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const NavText = styled.div`
  margin-top: 4px;
  font-size: 14px;
`;

const Divider = styled.div`
  height: 48px;
  width: 1px;
  background-color: white;
`;

const SettingsSection = styled.section`
  background-color: white;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 16px;
`;

const SettingsTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10.5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};
  font-size: 14px;
  cursor: pointer;
`;

const InfoSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }

  span:nth-child(2) {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.grey.grey02};
    cursor: pointer;
  }

  input[type="checkbox"] {
    display: none;
  }

  .toggle-switch {
    position: relative;
    width: 48px;
    height: 24px;
    background-color: ${({ theme }) => theme.colors.grey.background};
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .toggle-switch::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  input[type="checkbox"]:checked + .toggle-switch::before {
    transform: translateX(24px);
  }

  input[type="checkbox"]:checked + .toggle-switch {
    background-color: ${({ theme }) => theme.colors.primary.blue02};
  }
`;

const ToggleSwitch = styled.input`
  float: right;
`;

const SupportSection = styled(SettingsSection)``;
