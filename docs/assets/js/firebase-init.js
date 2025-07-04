

//使用 window.userLogData 作為全域共享資料容器
//順序位置要在最上方，不可調動

window.userLogData = {
  questionCode: "" || null,
  questionText: "" || null,
  choiceId: "" || null,
  choiceText: "" || null,
  fragmentEffect: "" || null,
  emotionalTag: "" || null,
  moduleInvolved: [] || null,
  visualPathId: "" || null,
  userPathProgress: "" || null,
  badgeUnlocked: "" || null,
  currentStatus: "" || null,
  earnedReward: "" || null,
};



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// 初始化 Firebase App
// 初始化 Firebase（這段不要重複定義）
if (!firebase.apps.length) {
  firebase.initializeApp({
  apiKey: "AIzaSyDOCXEjyQrMACAGCQYb6otGHKxW-P06oEc",
  authDomain: "merman-prince.firebaseapp.com",
  projectId: "merman-prince",
  storageBucket: "merman-prince.firebasestorage.app",
  messagingSenderId: "270239570479",
  appId: "1:270239570479:web:4556d74cb852ed9c0444da",
  measurementId: "G-BK57NGLXDB"
  });
}

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore(); // 初始化 Firestore
// window.db = db; // 讓其他 JS 可以使用 db

// 建立 Firestore 實例，掛上全域
window.db = firebase.firestore();
window.db = db;


