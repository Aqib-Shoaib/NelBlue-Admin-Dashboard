import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='p-6 min-h-screen overflow-y-scroll w-screen bg-white' >
        <Outlet />
    </div>
  )
}

export default AuthLayout