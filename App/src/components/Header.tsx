import React from 'react'
import { Link } from 'react-router-dom'
import Mobilenav from './Mobilenav'
import DesktopNav from './DesktopNav'

export default function Header() {
  return (
    <div className='border-b-2 border-b-orange-500 py-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to={"/"} className='text-3xl font-bold tracking-tight text-orange-500'>GoEat
        </Link>
        <div className='md:hidden'>
            <Mobilenav/>
        </div>
        <div className='hidden md:block'>
            <DesktopNav/>
        </div>
      </div>
    </div>
  )
}
