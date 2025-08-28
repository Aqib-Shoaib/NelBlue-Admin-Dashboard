import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import bxsDashboard from '@iconify-icons/bx/bxs-dashboard';
import chartPie from '@iconify-icons/mdi/chart-pie';
import usersIcon from '@iconify-icons/mdi/users';
import projectFilled from '@iconify-icons/ant-design/project-filled';

function Sidebar() {
  const location = useLocation();
  const navigation = useNavigate();
  const dashboardLists = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <Icon icon={bxsDashboard} width="24" height="24" />,
      link: '/',
    },
    {
      id: 2,
      name: 'Analytics',
      icon: <Icon icon={chartPie} width="24" height="24" />,
      link: '/analytics',
    },
    {
      id: 3,
      name: 'Users',
      icon: <Icon icon={usersIcon} width="24" height="24" />,
      link: '/users',
    },
    {
      id: 4,
      name: 'Bookings',
      icon: <Icon icon={projectFilled} width="24" height="24" />,
      link: '/bookings',
    },
  ];

  return (
    <div className='bg-[#023AA2] w-full h-full md:h-screen max-h-screen py-8 md:py-10 flex flex-col gap-8'>
      <h2 className='text-white text-xl font-inter font-bold px-6 md:px-10 my-6'>
        NELAUTOS
      </h2>
      <div className='w-full'>
        <ul className='flex flex-col gap-2'>
          {dashboardLists.map((item) => (
            <li
              onClick={() => navigation(item.link)}
              className={`flex justify-start items-center h-[55px] cursor-pointer text-white text-xl font-normal px-6 md:px-12 hover:bg-[#008DFF] ${location.pathname === item.link ? ' bg-[#008DFF]/28 border-l-2 border-[#008DFF]/97' : ''
                }`}
              key={item.id}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </span>
              <div className='ml-4 flex flex-col'>
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
