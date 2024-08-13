"use client";
import React from "react";
import styled from "styled-components";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { SettingContainer } from "../cs/page";

const TermsOfServicePage = () => {
  return (
    <SettingContainer>
      <SettingHeader title="이용약관" />
      <ContentSection>
        <Title>서비스 이용약관</Title>
        <LastUpdated>최종 업데이트: 2024년 8월 13일</LastUpdated>
        <TermsContent>
          <Section>
            <SectionTitle>1. 서비스 이용 약관</SectionTitle>
            <Paragraph>
              본 약관은 [회사명] (이하 "회사")가 제공하는 모든 서비스(이하
              "서비스")의 이용 조건 및 절차, 회사와 회원 간의 권리, 의무 및
              책임사항 등을 규정함을 목적으로 합니다.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>2. 개인정보 보호</SectionTitle>
            <Paragraph>
              회사는 관계법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해
              노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의
              개인정보처리방침이 적용됩니다.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>3. 서비스 이용</SectionTitle>
            <Paragraph>
              회원은 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에
              동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
            </Paragraph>
          </Section>
          {/* 추가 섹션들... */}
        </TermsContent>
      </ContentSection>
    </SettingContainer>
  );
};

export default TermsOfServicePage;

const ContentSection = styled.section`
  background-color: white;
  border-radius: 24px;
  padding: 24px;
  margin-top: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const LastUpdated = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 24px;
`;

const TermsContent = styled.div`
  font-size: 15px;
  line-height: 1.6;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Paragraph = styled.p`
  margin-bottom: 12px;
`;
