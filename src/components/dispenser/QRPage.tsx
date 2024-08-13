"use client";
import { SettingHeader } from "../settingPage/SettingHeader";
import { SettingWhiteContainer } from "../Container.styles";
import Image from "next/image";
import styled from "styled-components";
import { Description } from "./ChoicePage";
import QrScanner from "./QrScanner";
import { useRouter } from "next/navigation";

function QRPage() {
  const router = useRouter();
  return (
    <SettingWhiteContainer>
      <SettingHeader title="디스펜서 등록" />
      <QrScanner />
      <QRPageWrapper>
        <Description>
          QR 코드는 디스펜서 후면 스티커에 <br />
          부착되어 있습니다
        </Description>
        <ImageFlex>
          <Image
            src="/images/CLogo.png"
            alt="QR example image"
            style={{ objectFit: "cover" }}
            width={80}
            height={80}
            priority
          />
          <Image
            src="/images/QRImage.png"
            alt="QR example image"
            style={{ objectFit: "cover" }}
            width={80}
            height={80}
            priority
          />
        </ImageFlex>
        <UnderlinedText
          onClick={() => router.push("/mypage/setting/dispenser/choice/direct")}
        >
          코드 직접 입력하기
        </UnderlinedText>
      </QRPageWrapper>
    </SettingWhiteContainer>
  );
}
export default QRPage;

const QRPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;
const ImageFlex = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  border: 1px solid ${({ theme }) => theme.colors.grey.background};
  border-radius: 12px;
  max-width: 400px;
  padding: 0.5rem;
  height: 70px;
`;

const UnderlinedText = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.grey01};
  color: ${({ theme }) => theme.colors.grey.grey01};
  font-size: 14px;
`;
