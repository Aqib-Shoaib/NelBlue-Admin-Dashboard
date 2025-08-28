import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='px-6 min-h-dvh w-full overflow-x-hidden overflow-y-auto bg-white'>
        <Outlet />
    </div>
  )
}

export default AuthLayout