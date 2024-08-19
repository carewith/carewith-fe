import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/');
  }

  const response = await fetch(`https://api.carewith.life/api/v1/auth/kakao?code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return NextResponse.redirect('/');
  }

  const data = await response.json();
  const accessToken = data.data.accessToken;

  return NextResponse.redirect(`/login-success?token=${accessToken}`);
}
