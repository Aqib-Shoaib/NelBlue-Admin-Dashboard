import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className='grid md:grid-cols-[260px_1fr] grid-cols-1 w-full min-h-dvh overflow-x-hidden'>
      {/* Desktop sidebar */}
      <div className='hidden md:block h-full'>
        <Sidebar />
      </div>

      {/* Content area */}
      <div className='relative h-dvh overflow-y-auto overflow-x-hidden'>
        {/* Mobile top bar with hamburger */}
        <div className='md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b'>
          <div className='flex items-center gap-3 p-3'>
            <button
              aria-label='Open menu'
              onClick={() => setOpen(true)}
              className='inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50 active:scale-95 transition'
            >
              {/* Hamburger icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5" clip-rule="evenodd"/></svg>
            </button>
            <span className='font-bold text-[#023AA2]'>NELAUTOS</span>
          </div>
        </div>

        <Outlet />
      </div>

      {/* Mobile drawer sidebar */}
      {open && (
        <div className='md:hidden fixed inset-0 z-50'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/40'
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div className='absolute top-0 left-0 h-full w-[80%] max-w-[320px] shadow-xl'>
            <div className='h-full bg-[#023AA2]'>
              <div className='flex items-center justify-between px-4 py-3 bg-[#01307F]'>
                <span className='text-white font-bold'>Menu</span>
                <button
                  aria-label='Close menu'
                  onClick={() => setOpen(false)}
                  className='text-white text-lg px-2 py-1 rounded hover:bg-white/10'
                >
                  ✕
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout

