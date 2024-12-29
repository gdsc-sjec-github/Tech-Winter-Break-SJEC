import React from 'react'
import { Menu, X } from "lucide-react"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../assets/default-profile.jpg'

const NavBar = () => {
    const [ drawerOpen, SetDrawerOpen ] = useState(false);

    const toggleNavbar = () => {
        SetDrawerOpen(!drawerOpen);
    }
  
    return (
    <nav className='sticky z-50 top-0 w-full h-[60px] p-4 bg-zinc-900 text-white shadow-sm shadow-neutral-800'>
        <div className='flex justify-between items-center flex-shrink-0'>
            <h1 className='text-xl font-bold tracking-wide'>Parcel <span className='bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text'>Monitor</span></h1>
            <div className='flex justify-between items-center gap-4 max-w-[600px]'>
                <Link to='/login' className='hidden md:block text-sm font-medium bg-white text-black rounded-2xl px-4 py-1'>Login</Link>
                <Link to='/register' className='hidden md:block text-sm font-medium bg-white text-black rounded-2xl px-4 py-1'>Register</Link>
                <Link to='/register' className='hidden md:block text-sm font-medium bg-white text-black rounded-2xl px-4 py-1'>Create Task</Link>
                <div className="md:hidden flex justify-center items-center">
                    <button onClick={toggleNavbar}>
                        { drawerOpen ? <X /> : <Menu /> }
                    </button>
                </div>
                <div className='h-8 w-8 rounded-full overflow-hidden'>
                    <img src={defaultImg} alt="default profile picture" />
                </div>
            </div>
        </div>
        {drawerOpen && (
        <div className='absolute top-[60px] left-0 w-full bg-zinc-800 text-white p-4 flex flex-col space-y-4 md:hidden'>
          <Link to='/login' className='text-sm font-medium'>Login</Link>
          <Link to='/register' className='text-sm font-medium'>Register</Link>
          <Link to='/create-task' className='text-sm font-medium'>Create Task</Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar