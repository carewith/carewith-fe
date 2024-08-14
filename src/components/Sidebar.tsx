"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import {
  IoClose,
  IoChevronForward,
  IoWalletOutline,
  IoHeadset,
} from "react-icons/io5";
import { Divider, NavItemWrapper, NavText } from "./mypage/myPage.styles";

import { FaArrowsRotate } from "react-icons/fa6";
import { getUserData, User } from "@/service/userService";
import {
  DispenserPatientType,
  getDispenserPatient,
  PatientType,
} from "@/service/dispenser";
interface MenuItemWithCloseProps {
  href: string;
  children: ReactNode;
}
const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const NavItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <NavItemWrapper>
    <Icon size={24} />
    <NavText>{text}</NavText>
  </NavItemWrapper>
);

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 1001;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const ProfileSection = styled.section`
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  margin-bottom: 1rem;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  position: relative;
  z-index: 2;
`;

const MenuSection = styled.div`
  background: white;
  padding: 16px;
  margin-top: -24px;
  position: relative;
  z-index: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const MenuCategory = styled.h3`
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-size: 13px;
  font-weight: 400;
  margin: 20px 0 10px;
`;

const MenuItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};
  color: black;
  text-decoration: none;
  font-size: 14px;
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

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 17px;
  font-weight: 500;
  margin: 0;
`;

const UserStatus = styled.p`
  font-size: 11px;
  margin: 5px 0 0;
`;

const EditProfileButton = styled.button`
  background-color: white;
  color: ${({ theme }) => theme.colors.primary.blue02};
  font-size: 13px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ToggleSwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};
  font-size: 14px;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 48px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &::before {
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

  &.active {
    background-color: ${({ theme }) => theme.colors.primary.blue02};
  }

  &.active::before {
    transform: translateX(24px);
  }
`;

export const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  border-radius: 24px;
  padding: 20px;
  margin-top: 1rem;
  color: white;
`;

const DispenserBanner = styled.div`
  color: black;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const DispenserIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DispenserInfo = styled.div`
  flex: 1;
`;

const DispenserTitle = styled.h4`
  font-size: 13px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.primary.blue02};
`;

const DispenserName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [patientData, setPatientData] = useState<PatientType | null>(null);
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getDispenserPatient();
        if (data.dispenserPatients && data.dispenserPatients.length > 0) {
          setPatientData(data.dispenserPatients[0]);
        }
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    };

    if (isOpen) {
      fetchPatientData();
    }
  }, [isOpen]);

  const MenuItemWithClose: React.FC<MenuItemWithCloseProps> = ({
    href,
    children,
  }) => (
    <MenuItem
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClose();
        router.push(href);
      }}
    >
      {children}
    </MenuItem>
  );
  return (
    <SidebarOverlay isOpen={isOpen} onClick={onClose}>
      <SidebarContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <Header>
          <span>바로가기</span>
          <CloseButton onClick={onClose}>
            <IoClose />
          </CloseButton>
        </Header>
        <ProfileSection>
          <ProfileInfo>
            <ProfileImage
              src={userData?.profileImage || "/images/profile.png"}
              alt="Profile"
            />
            <UserInfo>
              <UserName>{userData?.name || "사용자"}</UserName>
              <UserStatus>의약품 처방 노쇼지</UserStatus>
            </UserInfo>
            <EditProfileButton>프로필 수정</EditProfileButton>
          </ProfileInfo>

          <NavigationWrapper>
            <NavItem icon={FaArrowsRotate} text="디스펜서 전환" />
            <Divider />
            <NavItem icon={IoWalletOutline} text="구독 관리" />
            <Divider />
            <NavItem icon={IoHeadset} text="고객센터" />
          </NavigationWrapper>
        </ProfileSection>
        <MenuSection>
          <DispenserBanner>
            <DispenserIcon>
              <ProfileImage
                src={patientData?.patientProfileImage || "/images/profile.png"}
                alt="Patient Profile"
              />
            </DispenserIcon>
            <DispenserInfo>
              <DispenserTitle>현재 관리중인 디스펜서</DispenserTitle>
              <DispenserName>
                {patientData?.dispenserModelName || "디스펜서 정보 없음"}
              </DispenserName>
            </DispenserInfo>
          </DispenserBanner>
          <MenuCategory>등록</MenuCategory>
          <MenuItemWithClose href="/home">
            오늘 복약 현황
            <IoChevronForward />
          </MenuItemWithClose>
          <MenuItemWithClose href="/register">
            등록된 복용약 목록
            <IoChevronForward />
          </MenuItemWithClose>
          <MenuItemWithClose href="/register/add">
            복용약 추가
            <IoChevronForward />
          </MenuItemWithClose>

          <MenuCategory>기록</MenuCategory>
          <MenuItemWithClose href="/mypage/history">
            복약 기록
            <IoChevronForward />
          </MenuItemWithClose>

          <MenuCategory>마이페이지</MenuCategory>
          <MenuItemWithClose href="/mypage/setting/profile">
            계정 및 프로필 관리
            <IoChevronForward />
          </MenuItemWithClose>
          <MenuItemWithClose href="/mypage/setting/dispenser/manage">
            디스펜서 관리
            <IoChevronForward />
          </MenuItemWithClose>
          <MenuItemWithClose href="/reminder">
            알림 설정
            <IoChevronForward />
          </MenuItemWithClose>
          <ToggleSwitchWrapper>
            큰 글씨 모드
            <ToggleSwitch className="active" />
          </ToggleSwitchWrapper>
          <MenuItemWithClose href="/info">
            앱 정보
            <IoChevronForward />
          </MenuItemWithClose>
          <MenuItemWithClose href="/notice">
            공지사항
            <IoChevronForward />
          </MenuItemWithClose>
          <MenuItemWithClose href="/cs">
            고객센터
            <IoChevronForward />
          </MenuItemWithClose>
        </MenuSection>
      </SidebarContainer>
    </SidebarOverlay>
  );
};

export default Sidebar;
