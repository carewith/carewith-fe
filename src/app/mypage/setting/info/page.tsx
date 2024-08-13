"use client";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { IoChevronForward } from "react-icons/io5";
import { ContentSection, SettingContainer, SettingItem } from "../cs/page";
import styled from "styled-components";

type Props = {};

function CsPage({}: Props) {
  return (
    <SettingContainer>
      <SettingHeader title="앱 정보" />
      <ContentSection>
        <SettingItem>
          업데이트 정보
          <VersionText>업데아트 버전</VersionText>
        </SettingItem>
        <SettingItem>
          데이터 관리
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
      </ContentSection>
    </SettingContainer>
  );
}

export default CsPage;

const VersionText = styled.h4`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey02};
`;
