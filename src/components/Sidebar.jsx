import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

import bxsDashboard from '@iconify-icons/bx/bxs-dashboard';
import chartPie from '@iconify-icons/mdi/chart-pie';
import usersIcon from '@iconify-icons/mdi/users';
import projectFilled from '@iconify-icons/ant-design/project-filled';

function Sidebar() {
  const location = useLocation();
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
      name: 'Project',
      icon: <Icon icon={projectFilled} width="24" height="24" />,
      link: '/project',
    },
  ];

  return (
    <div className='bg-[#023AA2] w-full h-full md:h-screen max-h-screen py-8 md:py-10 flex flex-col gap-8'>
      <h2 className='text-white text-lg font-bold px-6 md:px-10'>
        NELAUTOS
      </h2>
      <div className='w-full'>
        <ul className='flex flex-col gap-2'>
          {dashboardLists.map((item) => (
            <li
              className={
                location.pathname === item.link
                  ? 'text-white text-lg font-bold bg-[#004080] px-6 md:px-12'
                  : 'text-white text-lg font-bold hover:bg-[#00264D] px-6 md:px-12'
              }
              key={item.id}
            >
              <Link to={item.link} className='flex justify-start items-center gap-2 w-full h-full px-4 py-2'>
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
