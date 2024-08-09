"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      fetch("https://api.carewith.life/api/v1/auth/kakao?code=" + code)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "SUCCESS") {
            document.cookie = `accessToken=${data.data.accessToken}; path=/;`;
            document.cookie = `refreshToken=${data.data.refreshToken}; path=/;`;
            router.push("/");
          } else {
            console.error("로그인 실패", data);
          }
        })
        .catch((error) => console.error("로그인 중 오류 발생", error));
    }
  }, []);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=b4b9c60f1b384cecdc2553fabafb3ec3&redirect_uri=https://api.carewith.life/api/v1/auth/kakao/local&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      <button onClick={handleKakaoLogin}>카카오톡 로그인</button>
    </div>
  );
};

export default LoginPage;
