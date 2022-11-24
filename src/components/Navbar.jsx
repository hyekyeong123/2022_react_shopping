import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from "./User";
import Button from "./ui/Button";

export default function Navbar() {
  const [user, setUser] = useState();

  // 유저 상태가 변경될때마다 출력
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>

      <nav className='flex items-center gap-4 font-semibold'>

        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>

        {user && user.isAdmin &&
          (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill/>
          </Link>
          )
        }
        {!user && <Button onClick={login} text="Login"/>}
        {user && <User user={user}/>}
        {user && <Button onClick={logout} text="Logout"/>}
      </nav>
    </header>
  );
}
