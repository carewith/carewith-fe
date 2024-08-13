"use client";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { IoChevronForward } from "react-icons/io5";
import {
  SettingContainer,
  ContentSection,
  SettingItem,
} from "@/components/Container.styles";

type Props = {};

function CsPage({}: Props) {
  return (
    <SettingContainer>
      <SettingHeader title="고객센터" />
      <ContentSection>
        <SettingItem>
          FAQ
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
        <SettingItem>
          1:1문의
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
        <SettingItem>
          앱 피드백
          <IoChevronForward color="#CAD0E3" size={22} />
        </SettingItem>
      </ContentSection>
    </SettingContainer>
  );
}

export default CsPage;
