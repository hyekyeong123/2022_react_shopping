import React from 'react';
import {useAuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children, requireAdmin}) {
  // 로그인한 사용자가 있는지 확인
  // 그 사용자가 어드민 권한이 있는지 확인
  // requireAdmin이 true인 경우에는 로그인이 되어 있어야하고 어드민 권한도 있어야함
  // 조건에 맞지 않으면 상위 경로로 이동
  // 조건에 맞는 경우에만 전달된 children을 보여줌

  const { user } = useAuthContext();
  if(!user || (requireAdmin && !user.isAdmin)){

    // 현재 경로를 history에 넣고 싶지 않다면
    return <Navigate to="/" replace={true}/>
  }else return children;
};