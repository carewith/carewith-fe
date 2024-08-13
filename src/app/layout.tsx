import type { Metadata } from "next";
import "../styles/globals.css";
import Container from "@/components/layout/Container";
import Header from "@/components/Header";
import ClientThemeProvider from "@/components/layout/ClientThemeProvider";
import FCMComponent from "@/components/FCMComponent";
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ClientThemeProvider>
          <Header />
          <FCMComponent />
          <Container>{children}</Container>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
