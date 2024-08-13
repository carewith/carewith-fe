importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDr9XIlQl6FQTgUdX_rsHanR0WV8jCKvVI",
  authDomain: "carewith-19971.firebaseapp.com",
  projectId: "carewith-19971",
  storageBucket: "carewith-19971.appspot.com",
  messagingSenderId: "411885301969",
  appId: "1:411885301969:web:d10cb578af206f145315f0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // 여기서 알림을 표시하거나 다른 백그라운드 작업을 수행할 수 있습니다.
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
