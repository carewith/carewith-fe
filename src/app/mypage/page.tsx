"use client";
import { useState } from "react";
import Link from "next/link";
import { IoChevronForward, IoHeadset, IoWalletOutline } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";

import {
  NavItemWrapper,
  NavText,
  SettingItemWrapper,
  SectionWrapper,
  SettingsTitle,
  ToggleSwitchWrapper,
  ProfileSection,
  ProfileInfo,
  ProfileImage,
  UserName,
  UserContact,
  EditProfileButton,
  NavigationMenu,
  Divider,
  InfoSectionRow,
  Container,
  ModalOverlay,
  ModalContent,
  ModalHandle,
  ModalTitle,
  InputWrapper,
  ModalButton,
  Input,
} from "@/components/mypage/myPage.styles";
import { useRouter } from "next/navigation";

const NavItem = ({
  icon: Icon,
  text,
  onClick,
}: {
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
}) => (
  <NavItemWrapper onClick={onClick}>
    <Icon size={24} />
    <NavText>{text}</NavText>
  </NavItemWrapper>
);
const SettingItem = ({ text, href }: { text: string; href: string }) => (
  <Link href={href} passHref>
    <SettingItemWrapper>
      {text}
      <IoChevronForward color="#CAD0E3" size={20} />
    </SettingItemWrapper>
  </Link>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <SectionWrapper>
    <SettingsTitle>{title}</SettingsTitle>
    {children}
  </SectionWrapper>
);

const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <ToggleSwitchWrapper onClick={onChange}>
    <input type="checkbox" checked={checked} readOnly />
    <div className="toggle-switch"></div>
  </ToggleSwitchWrapper>
);

const MyPage = () => {
  const router = useRouter();
  const [isLargeText, setIsLargeText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleLargeText = () => setIsLargeText(!isLargeText);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

      <NavigationMenu>
        <NavItem
          icon={FaArrowsRotate}
          text="디스펜서 전환"
          onClick={() => router.push("/home")}
        />
        <Divider />
        <NavItem
          icon={IoWalletOutline}
          text="구독 관리"
          onClick={() => router.push("/mypage/setting/billing")}
        />
        <Divider />
        <NavItem
          icon={IoHeadset}
          text="고객센터"
          onClick={() => router.push("/mypage/setting/cs")}
        />
      </NavigationMenu>

      <Section title="설정">
        <SettingItemWrapper onClick={toggleModal}>
          {"계정 및 프로필 관리"}
          <IoChevronForward color="#CAD0E3" size={20} />
        </SettingItemWrapper>
        <SettingItem text="기기 관리" href="/mypage/setting/dispenser/manage" />
        <SettingItem text="알림 설정" href="/mypage/setting/reminder" />
        <InfoSectionRow>
          <span>큰 글씨</span>
          <ToggleSwitch
            checked={isLargeText}
            onChange={handleToggleLargeText}
          />
        </InfoSectionRow>
        <SettingItem text="앱 정보" href="/mypage/setting/info" />
      </Section>

      <Section title="고객지원">
        <SettingItem text="구독 및 결제 관리" href="/mypage/setting/billing" />
        <SettingItem text="공지사항" href="/mypage/setting/notice" />
        <SettingItem text="이용약관" href="/mypage/setting/conditions" />
        <SettingItem text="고객센터" href="/mypage/setting/cs" />
      </Section>
      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalTitle>준비중인 기능입니다</ModalTitle>
            <ModalButton onClick={toggleModal}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MyPage;
