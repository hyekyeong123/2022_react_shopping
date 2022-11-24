import {createContext, useContext} from "react";

const AuthContext = createContext();

export function AuthContextProvide({children}){
  return <AuthContext.Provider>
    {children}
  </AuthContext.Provider>
}
export function useAuthContext(){
  return useContext(AuthContext)
}