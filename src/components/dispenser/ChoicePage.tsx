"use client";

import { useRouter } from "next/navigation";
import { SettingHeader } from "../settingPage/SettingHeader";
import { SettingWhiteContainer } from "../Container.styles";
import styled from "styled-components";

function ChoicePage() {
  const router = useRouter();
  return (
    <SettingWhiteContainer>
      <SettingHeader title="디스펜서 등록" />
      <ContainerChoice>
        <FlexBox>
          <ChoiceBox
            onClick={() => router.push("/mypage/setting/dispenser/choice/qr")}
          >
            QR 코드 스캔
          </ChoiceBox>
          <ChoiceBox
            onClick={() =>
              router.push("/mypage/setting/dispenser/choice/direct")
            }
          >
            코드 직접 입력
          </ChoiceBox>
        </FlexBox>
        <Description>
          첫 디스펜서를 등록하고 케어위드의 복약 알림 및 <br />약 복용 관리
          자동화 서비스를 만나보세요
        </Description>
      </ContainerChoice>
    </SettingWhiteContainer>
  );
}
export default ChoicePage;

const ContainerChoice = styled.div`
  display: flex;
  height: 60vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  align-items: center;
`;

const ChoiceBox = styled.button`
  font-size: 19px;
  height: 180px;
  padding: 1.75rem;
  font-weight: 400;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.grey.grey01};
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-size: 13px;
  flex-wrap: wrap;
  text-align: center;
  font-weight: 300;
  width: 80%;
`;
