"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KakaoRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const fetchTokens = async (code: string) => {
      try {
        const response = await fetch(
          `https://api.carewith.life/api/v1/auth/kakao?code=${code}`
        );

        if (!response.ok) {
          throw new Error("토큰 요청 실패");
        }

        const data = await response.json();

        if (data.status === "SUCCESS") {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);

          router.push("/");
        } else {
          console.error("로그인 실패");
          router.push("/login");
        }
      } catch (error) {
        console.error("토큰 요청 중 에러 발생:", error);
        router.push("/login");
      }
    };

    if (code) {
      fetchTokens(code);
    } else {
      console.error("인증 코드가 URL에 없습니다.");
      router.push("/login");
    }
  }, [router]);

  return <div>로그인 중...</div>;
};

export default KakaoRedirect;
