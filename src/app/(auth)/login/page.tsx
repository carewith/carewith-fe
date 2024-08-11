"use client";

const LoginPage = () => {
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
