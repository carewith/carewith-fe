"use client";

import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { SettingHeader } from "../settingPage/SettingHeader";
import { SettingWhiteContainer } from "../Container.styles";
import { useParams, useRouter } from "next/navigation";

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 27px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4285f4;
  width: 100%;
  max-width: 760px;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 17px;
  cursor: pointer;
  margin: 10px 0;
`;

const LinkText = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  padding: 0.2rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey.grey02};
  cursor: pointer;
`;

const FlexBox = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
function CompletePatientPage() {
  const router = useRouter();
  return (
    <SettingWhiteContainer>
      <FlexBox>
        <IconWrapper>
          <FaCheck color={"#4285f4"} size={40} />
        </IconWrapper>
        <Title>복용자 등록 완료!</Title>
        <SubText>마이페이지에서 방금 설정한 내용을 변경할 수 있어요.</SubText>
        <Button onClick={() => router.push(`/home`)}>홈으로 돌아가기</Button>
      </FlexBox>
    </SettingWhiteContainer>
  );
}

export default CompletePatientPage;
