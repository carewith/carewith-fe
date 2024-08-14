"use client";
import styled from "styled-components";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { SettingContainer } from "@/components/Container.styles";

const NoticePage = () => {
  return (
    <SettingContainer>
      <SettingHeader title="공지사항" />
      <ContentSection>
        <Title>CAREWITH 서비스 시연 안내</Title>
        <LastUpdated>게시일: 2024년 8월 13일</LastUpdated>
        <NoticeContent>
          <Section>
            <SectionTitle>1. 시연 일정</SectionTitle>
            <Paragraph>
              BLAYBUS 해커톤 참가 서비스인 CAREWITH의 알약 디스펜서 관련 서비스
              시연이 2024년 8월 14일 수요일 13:00부터 13:30까지 예정되어
              있습니다.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>2. 시연 내용</SectionTitle>
            <Paragraph>
              본 시연에서는 CAREWITH의 혁신적인 알약 디스펜서 서비스의 주요
              기능과 사용자 경험을 선보일 예정입니다. 참가자들은 서비스의 사용
              편의성과 효율성을 직접 체험하실 수 있습니다.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>3. 참가 안내</SectionTitle>
            <Paragraph>
              BLAYBUS 해커톤 참가자 및 관계자 여러분들의 많은 관심과 참여
              부탁드립니다. 시연 장소 및 세부 일정은 행사장 내 안내 데스크에서
              확인하실 수 있습니다.
            </Paragraph>
          </Section>
        </NoticeContent>
      </ContentSection>
    </SettingContainer>
  );
};

export default NoticePage;

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

const NoticeContent = styled.div`
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
