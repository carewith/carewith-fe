"use client";
import { useState } from "react";
import { SettingHeader } from "../settingPage/SettingHeader";
import { SettingWhiteContainer } from "../Container.styles";
import Image from "next/image";
import styled from "styled-components";
import { Description } from "./ChoicePage";
import { useRouter } from "next/navigation";

function DirectPage() {
  const router = useRouter();
  const [productCode, setProductCode] = useState("");

  const handleSubmit = () => {
    if (productCode) {
      router.push(`/mypage/setting/dispenser/choice/regist/${productCode}`);
    }
  };

  return (
    <SettingWhiteContainer>
      <SettingHeader title="디스펜서 등록" />
      <DirectPageWrapper>
        <Description>
          QR 코드는 디스펜서 후면 스티커에 <br />
          부착되어 있습니다
        </Description>
        <ImageFlex>
          <ProductCodeOverlay>
            제품코드
            <br />
            1234567
          </ProductCodeOverlay>
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
        <InputWrapper>
          <InputLabel>제품코드</InputLabel>
          <Input
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="제품코드를 입력하세요"
          />
        </InputWrapper>
        <Button onClick={handleSubmit} disabled={!productCode}>
          다음
        </Button>
        <UnderlinedText onClick={() => router.push("/mypage/setting/cs")}>
          QR코드 스캔하기
        </UnderlinedText>
      </DirectPageWrapper>
    </SettingWhiteContainer>
  );
}

export default DirectPage;

const DirectPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
`;

const ImageFlex = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grey.background};
  border-radius: 12px;
  max-width: 400px;
  padding: 0.5rem;
  height: 100px;
`;

const ProductCodeOverlay = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey.grey01};
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey.background};
    cursor: not-allowed;
  }
`;

const UnderlinedText = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.grey01};
  color: ${({ theme }) => theme.colors.grey.grey01};
  font-size: 14px;
  cursor: pointer;
`;
