import type { Metadata } from "next";
import "../styles/globals.css";
export const metadata: Metadata = {
  title: "CAREWITH",
  description: "치매 환자 알약 디스펜서 관리 App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
