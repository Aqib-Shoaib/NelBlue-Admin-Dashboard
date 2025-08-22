import React from 'react'
import { Icon } from "@iconify/react";
import mailO from "@iconify-icons/mdi/email-outline";
import userIcon from "@iconify-icons/mdi/account"; // Replacing user24 with mdi/account
import rightArrow from "@iconify-icons/icon-park-outline/right";
import notificationIcon from "@iconify-icons/tdesign/notification";
import { useProfile } from '../store/useAuth';
import Spinner from './Spinner';

function Topbar({ title, subTitle }) {
    const { data: profile, isLoading } = useProfile();

    if(isLoading) {
        return (
            <div className="w-full h-16 flex items-center justify-center">
                <Spinner size="small" />
            </div>
        );
    }

    return (
        <div className='w-full'>
            <div className="flex flex-wrap gap-3 justify-between items-center">
                <div className="flex flex-col min-w-0">
                    <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl capitalize truncate">{title}</h2>
                    {subTitle && <span className="text-sm sm:text-base md:text-xl capitalize text-black/70">{subTitle}</span>}
                </div>
                <div className="">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 group hover:bg-gray-700 rounded-full transition-all duration-150 cursor-pointer">
                            <Icon icon={mailO} width="22" height="22" className="sm:hidden text-gray-800 group-hover:text-white" />
                            <Icon icon={mailO} width="30" height="30" className="hidden sm:block text-gray-800 group-hover:text-white" />
                        </span>
                        <span className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 group hover:bg-gray-700 rounded-full transition-all duration-150 cursor-pointer">
                            <Icon icon={notificationIcon} width="22" height="22" className="sm:hidden text-gray-800 group-hover:text-white" />
                            <Icon icon={notificationIcon} width="30" height="30" className="hidden sm:block text-gray-800 group-hover:text-white" />
                        </span>
                        <span className="flex items-center gap-1 justify-center px-2 py-1 sm:p-2 group hover:bg-gray-700 rounded-full transition-all duration-150 cursor-pointer">
                            <Icon icon={userIcon} width="22" height="22" className="sm:hidden text-gray-800 group-hover:text-white" />
                            <Icon icon={userIcon} width="30" height="30" className="hidden sm:block text-gray-800 group-hover:text-white" />
                            <span className="text-gray-800 group-hover:text-white hidden sm:inline">{profile?.firstName || 'Guest'}</span>
                            <Icon icon={rightArrow} width="22" height="22" className="sm:hidden text-gray-800 group-hover:text-white" />
                            <Icon icon={rightArrow} width="30" height="30" className="hidden sm:block text-gray-800 group-hover:text-white" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar