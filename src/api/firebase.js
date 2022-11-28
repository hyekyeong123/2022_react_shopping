import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import {v4 as uuid} from 'uuid';
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
const database = getDatabase(app); // 데이터 베이스 초기화

// region **************************** 사용자 관련 ****************************
export function login() {
  signInWithPopup(auth, provider)
  .catch(console.error);
}

export function logout() {
  signOut(auth)
  .catch(console.error);
}

// Set an authentication state observer and get user data
// 전역 관찰자 연결 - 로그인 상태가 변결될때마다 호출
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // console.log("[JHG] user : "+JSON.stringify(user));
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser)
  });
}

// 사용자가 어드민 권한을 가지고 있는지 확인
async function adminUser(user){

  // 파이버베이스 DB에서 admins 가져오기
  const dbRef = ref(getDatabase());
  return get(child(dbRef, 'admins'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return {...user, isAdmin}
    }
    return user;
  }).catch((error) => {
    console.error(error);
  });
}
// endregion **************************** 사용자 관련 ****************************


// region **************************** 상품 관련 ****************************

// 파이어베이스에 제품 추가
export async function addNewProduct(product, imageUrl){
  const id = uuid();
  return set(
    ref(database, `products/${id}`),{
      ...product,
      id,
      price:parseInt(product.price),
      image:imageUrl,
      options:product.options.split(',')
    }
  )
}

// 파이어베이스에서 제품 가져오기
export async function getProducts(){
  return get(ref(database, 'products'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }else return [];
  }).catch((error) => {
    console.error(error);
  });
}
// endregion **************************** 상품 관련 ****************************


// region **************************** 장바구니 관련 ****************************
export async function getCart(userId){
  return get(ref(database, `carts/${userId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val() || {};
      return Object.values(items);
    }
    else return [];
  }).catch((error) => {
    console.error(error);
  });
}

export async function addOrUpdateToCart(userId, product){
  return set(ref(database, `carts/${userId}/${product.id}`), product)
}

export async function deleteFromCart(userId, productId){
  return remove(ref(database, `carts/${userId}/${productId}`))
}
// endregion **************************** 장바구니 관련 ****************************