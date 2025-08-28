import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Topbar from "../components/Topbar";
import { useGetAllUsers } from "../store/useAuth";
import Spinner from "../components/Spinner";
import Drawer from "../components/Drawer";
import UserDetails from "../components/UserDetails";

function Users() {
  const [active, setActive] = useState("client");
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: usersData, isLoading, isError, error, refetch } = useGetAllUsers();

  const openDetails = (user) => {
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  // Define stats after the early return check
  const clients = usersData?.filter((u) => u.role.toLowerCase() === 'client') || [];
  const professional = usersData?.filter((u) => u.role.toLowerCase() === 'professional') || [];

  const ProfessionalStats = [
    {
      title: "Total Professionals",
      value: professional.length,
    },
    {
      title: "New Professionals",
      value: professional.filter((m) => m.identityVerified).length,
    },
    {
      title: "Approved Professionals",
      value: professional.filter((m) => m.identityVerified).length,
    },
    {
      title: "Pending Professionals",
      value: professional.filter((m) => !m.identityVerified).length,
    },
  ];
  const clientStats = [
    {
      title: "Total Clients",
      value: clients.length,
    },
    {
      title: "New Clients",
      value: clients.filter((m) => m.identityVerified).length,
    },
    {
      title: "Approved Clients",
      value: clients.filter((m) => m.identityVerified).length,
    },
    {
      title: "Pending Clients",
      value: clients.filter((m) => !m.identityVerified).length,
    },
  ];

  console.log(usersData)

  return (
    <div className="w-full h-full p-10 space-y-8">
      {/* Topbar */}
      <Topbar title="users" />

      {/* Loading state - inline, doesn't cover sidebar */}
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <Spinner />
            <div className="mt-4 text-gray-600">Loading users...</div>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error?.message || 'Failed to load users'}</div>
      )}

      {/* Content - only show when not loading */}
      {!isLoading && (
        <>
          {/* Controls: Toggle + Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Toggle buttons */}
            <div className="flex gap-2">
              <button
                className={`px-6 py-2 rounded-lg text-lg font-medium ${active === "professional"
                  ? "bg-[#014F8E] text-white"
                  : "bg-white text-[#121212]"
                  }`}
                onClick={() => setActive("professional")}
              >
                Professional
              </button>
              <button
                className={`px-6 py-2 rounded-lg text-lg font-medium ${active === "client"
                  ? "bg-[#014F8E] text-white"
                  : "bg-white text-[#121212]"
                  }`}
                onClick={() => setActive("client")}
              >
                Client
              </button>
            </div>
          </div>

          {active === "professional" && (
            <div className="flex items-center gap-2">
              {ProfessionalStats.map((stat, idx) => (
                <div className="flex-1 h-[108px] bg-[#EDEDED] rounded-lg" key={idx} >
                  <div className="flex flex-col items-start justify-center gap-2 p-4">
                    <p className="text-[16px] font-semibold">{stat.title}</p>
                    <p className="text-[16px] font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>)}
          {active === "client" && (
            <div className="flex items-center gap-2">
              {clientStats.map((stat, idx) => (
                <div className="flex-1 h-[108px] bg-[#EDEDED] rounded-lg" key={idx} >
                  <div className="flex flex-col items-start justify-center gap-2 p-4">
                    <p className="text-[16px] font-semibold">{stat.title}</p>
                    <p className="text-[16px] font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>)}

          {/* Table - div based to match UserDetails drawer styles */}
          <div className="max-w-full my-2 border border-[#12121280] rounded-md overflow-hidden">
            {/* Header */}
            <div className="bg-[#F0F0F0] px-2 py-2">
              {active === "professional" ? (
                <div className="flex justify-between px-2 py-2 bg-[#F5F5F5] font-bold text-[#121212] text-sm">
                  <div className="flex-1 text-center px-2">S/N</div>
                  <div className="flex-1 text-center px-2">Name</div>
                  <div className="flex-1 text-center px-2">Email</div>
                  <div className="flex-1 text-center px-2">Location</div>
                  <div className="flex-1 text-center px-2">Verification</div>
                  <div className="flex-1 text-center px-2">Payment</div>
                </div>
              ) : (
                <div className="flex justify-between px-2 py-2 bg-[#F5F5F5] font-bold text-[#121212] text-sm">
                  <div className="flex-1 text-center px-2">S/N</div>
                  <div className="flex-1 text-center px-2">Name</div>
                  <div className="flex-1 text-center px-2">Email</div>
                  <div className="flex-1 text-center px-2">Location</div>
                  <div className="flex-1 text-center px-2">Verification</div>
                  <div className="flex-1 text-center px-2">Rate</div>
                </div>
              )}
            </div>

            {/* Rows */}
            {active === "professional"
              ? professional.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-2 py-2 bg-[rgba(224,224,224,0.25)] rounded-[10px] m-2 text-sm cursor-pointer"
                  onClick={() => openDetails(item)}
                >
                  <div className="flex-1 px-2 text-center">{item?.number ?? idx + 1}</div>
                  <div className="flex-1 px-2 text-center">
                    <p className="text-base">{`${item.firstName} ${item.lastName}`}</p>
                  </div>
                  <div className="flex-1 px-2 text-center">{item?.email}</div>
                  <div className="flex-1 px-2 text-center">{item?.address ?? 'Not Specified'}</div>
                  <div className={`flex-1 px-2 text-center font-medium ${item.identityVerified ? 'text-[#319F43]' : 'text-[#FF0000]'}`}>
                    {item.identityVerified ? 'Approved' : 'Pending'}
                  </div>
                  <div className="flex-1 px-2 text-center">{item?.payment ?? 'Not Specified'}</div>
                </div>
              ))
              : clients.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-2 py-2 bg-[rgba(224,224,224,0.25)] rounded-[10px] m-2 text-sm cursor-pointer"
                  onClick={() => openDetails(item)}
                >
                  <div className="flex-1 px-2 text-center">{item?.number ?? idx + 1}</div>
                  <div className="flex-1 px-2 text-center">
                    <p className="text-base">{`${item.firstName} ${item.lastName}`}</p>
                  </div>
                  <div className="flex-1 px-2 text-center">{item?.email}</div>
                  <div className="flex-1 px-2 text-center">{item?.address ?? 'Not Specified'}</div>
                  <div className={`flex-1 px-2 text-center font-medium ${item.identityVerified ? 'text-[#319F43]' : 'text-[#FF0000]'}`}>
                    {item.identityVerified ? 'Approved' : 'Pending'}
                  </div>
                  <div className="flex-1 px-2 text-center">{item?.payment ?? 'Not Specified'}</div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* User Details Drawer */}
      <Drawer
        isOpen={!!selectedUser}
        onClose={closeDetails}
        width="full"
        position="right"
      >
        <UserDetails user={selectedUser} onClose={closeDetails} onUpdate={() => refetch()} />
      </Drawer>
    </div>
  );
}

export default Users;
