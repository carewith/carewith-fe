"use client";

import Image from "next/image";
import styled from "styled-components";
import "../firebase";
const LoginContainer = styled.div`
  position: relative;
  height: 100vh;
  max-width: 768px;
  max-height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding-bottom: 40px;
`;

const KakaoButton = styled.button`
  width: 90%;
  max-width: 400px;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  background-color: #fee500;
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const LoginPage = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=b4b9c60f1b384cecdc2553fabafb3ec3&redirect_uri=https://api.carewith.life/api/v1/auth/kakao&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <LoginContainer>
      <ImageWrapper>
        <Image
          src="/images/kakao.png"
          alt="Carewith"
          layout="fill"
          objectFit="cover"
          priority
        />
      </ImageWrapper>
      <ContentWrapper>
        <KakaoButton onClick={handleKakaoLogin}>
          <KakaoIcon>🗨️</KakaoIcon>
          카카오톡으로 시작하기
        </KakaoButton>
      </ContentWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
