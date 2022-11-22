import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider)
  .then(console.log("로그인 성공"))
  .catch(console.error);
}

export function logout() {
  signOut(auth)
  .catch(console.error);
}

// Set an authentication state observer and get user data
// 전역 관찰자 연결 - 로그인 상태가 변결될때마다 호출
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user)
  });
}
