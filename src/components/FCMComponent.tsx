"use client";

import { getFCMToken, initializeFCM } from "@/firebase";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { registFcmToken } from "@/service/fcm";

function FCMComponent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const initializeFCMAndRegister = async () => {
      const hasFcmToken = searchParams.get("hasFcmToken") === "false";

      if (hasFcmToken) {
        try {
          // FCM 초기화 및 토큰 가져오기
          await initializeFCM();
          const token = await getFCMToken(
            process.env.NEXT_PUBLIC_VAPID as string
          );

          if (token) {
            await registFcmToken(token);
            console.log("FCM 토큰이 서버에 등록되었습니다.");
          }
        } catch (error) {
          console.error("FCM 토큰 등록 실패:", error);
        }
      } else {
        console.log("FCM 토큰이 이미 등록되어 있거나 필요하지 않습니다.");
      }
    };

    initializeFCMAndRegister();
  }, [searchParams]);

  return null;
}

export default FCMComponent;
