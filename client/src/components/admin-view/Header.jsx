import React from 'react'
import { Button } from '../ui/button';
import { AlignJustify } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/Store/auth-slice';


const AdminHeader =({setOpenSidebar})=> {
   const dispatch = useDispatch();


  function handleLogout(){
    dispatch(logoutUser())

  }
  return (
    <div className='bg-lime-500'>
      <header className='flex items-center justify-between px-4 py-3'>
      <Button onClick={()=> setOpenSidebar(true)} className="lg:hidden sm:block bg-black text-white">
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-emerald-600">
        <LogOut  />
        Logout
        </Button>
      </div>
      </header>
    </div>
  )
}

export default AdminHeader;