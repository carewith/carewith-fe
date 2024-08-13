'use client'

import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDr9XIlQl6FQTgUdX_rsHanR0WV8jCKvVI",
  authDomain: "carewith-19971.firebaseapp.com",
  projectId: "carewith-19971",
  storageBucket: "carewith-19971.appspot.com",
  messagingSenderId: "411885301969",
  appId: "1:411885301969:web:d10cb578af206f145315f0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

// FCM 토큰을 가져오거나 저장된 토큰을 반환하는 함수
export const getFCMToken = async (vapidKey: string) => {
  if (!messaging) return null;

  // 저장된 토큰 확인
  const savedToken = localStorage.getItem('fcmToken');
  
  if (savedToken) {
    try {
      // 저장된 토큰으로 새 토큰 요청
      // 유효하지 않으면 새 토큰 발급, 유효하면 같은 토큰 반환
      const currentToken = await getToken(messaging, { 
        vapidKey: vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
      });
      
      if (currentToken === savedToken) {
        console.log("저장된 FCM 토큰 유효:", savedToken);
        return savedToken;
      }
      
      // 토큰이 변경되었다면 새 토큰 저장
      console.log("FCM 토큰 갱신:", currentToken);
      localStorage.setItem('fcmToken', currentToken);
      return currentToken;
    } catch (error) {
      console.log("저장된 FCM 토큰 검증 실패:", error);
      // 오류 발생 시 저장된 토큰 삭제
      localStorage.removeItem('fcmToken');
    }
  }

  // 저장된 토큰이 없거나 유효하지 않은 경우 새 토큰 발급
  try {
    const newToken = await getToken(messaging, { 
      vapidKey: vapidKey,
      serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
    });
    if (newToken) {
      console.log("새 FCM 토큰 발급:", newToken);
      localStorage.setItem('fcmToken', newToken);
      return newToken;
    } else {
      console.log("FCM 토큰을 받을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.log("FCM 토큰 가져오기 오류:", error);
    return null;
  }
};

// FCM 초기화 함수
export const initializeFCM = async () => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('알림 권한이 거부되었습니다.');
      return;
    }
  }

  const token = await getFCMToken(process.env.NEXT_PUBLIC_VAPID as string);
  if (token) {
    console.log("FCM이 초기화되었습니다.");
    // 여기서 토큰을 서버에 전송하는 로직을 추가할 수 있습니다.
  }
};

export { app, messaging };
