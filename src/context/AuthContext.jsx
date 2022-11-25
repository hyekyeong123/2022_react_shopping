import {createContext, useContext, useEffect, useState} from "react";
import {login, logout, onUserStateChange} from "../api/firebase";


const AuthContext = createContext();

export function AuthContextProvider({children}){
  const [user, setUser] = useState();

  // 유저 상태가 변경될때마다 출력
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);
  // ********************************************************

  return (
    <AuthContext.Provider
    value={{user, login, logout, uid:user && user.uid}}
    >
    {children}
  </AuthContext.Provider>
  )
}
export function useAuthContext(){
  return useContext(AuthContext)
}