"use client";
import styled from "styled-components";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";

function BillingPage() {
  const router = useRouter();
  return (
    <SettingContainer>
      <SettingHeader title="구독 및 결제" />
      <SectionTitle>구독</SectionTitle>
      <ContentSection>
        <SettingItem>
          결제 수단 관리
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
        <SettingItem>
          결제 기록
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
      </ContentSection>
      <SectionTitle>결제</SectionTitle>
      <ContentSection>
        <SettingItem>
          구독 정보
          <PremiumTag>프리미엄</PremiumTag>
        </SettingItem>
        <SettingItem>
          구독 기록
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
      </ContentSection>
      <BottomMessage>
        구독 및 결제 문의는{" "}
        <UnderlinedText onClick={() => router.push("/mypage/setting/cs")}>
          고객센터
        </UnderlinedText>
        에서 문의 부탁드립니다.
      </BottomMessage>
    </SettingContainer>
  );
}

export default BillingPage;

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
  margin: 24px 0 8px 8px;
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
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};

  &:last-child {
    border-bottom: none;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const PremiumTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
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
