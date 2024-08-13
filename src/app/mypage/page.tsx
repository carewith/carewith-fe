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
} from "@/components/mypage/myPage.styles";

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
  const [isLargeText, setIsLargeText] = useState(false);

  const handleToggleLargeText = () => setIsLargeText(!isLargeText);

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
        <NavItem icon={FaArrowsRotate} text="디스펜서 전환" />
        <Divider />
        <NavItem icon={IoWalletOutline} text="구독 관리" />
        <Divider />
        <NavItem icon={IoHeadset} text="고객센터" />
      </NavigationMenu>

      <Section title="설정">
        <SettingItem
          text="계정 및 프로필 관리"
          href="/mypage/setting/profile"
        />
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
    </Container>
  );
};

export default MyPage;
