"use client";

import { getFCMToken, initializeFCM } from "@/firebase";
import { registFcmToken } from "@/service/fcm";
import { useEffect } from "react";

function FCMComponent() {
  useEffect(() => {
    const initializeFCMAndRegister = async () => {
      const hasFcmToken = localStorage.getItem("hasFcmToken") === "true";

      if (!hasFcmToken) {
        try {
          // FCM 초기화 및 토큰 가져오기
          await initializeFCM();
          const token = await getFCMToken(
            process.env.NEXT_PUBLIC_VAPID as string
          );

          if (token) {
            await registFcmToken(token);
            localStorage.setItem("hasFcmToken", "true");
            console.log("FCM 토큰이 서버에 등록되었습니다.");
          }
        } catch (error) {
          console.error("FCM 토큰 등록 실패:", error);
        }
      } else {
        console.log("FCM 토큰이 이미 등록되어 있습니다.");
      }
    };

    initializeFCMAndRegister();
  }, []);

  return null;
}

export default FCMComponent;
