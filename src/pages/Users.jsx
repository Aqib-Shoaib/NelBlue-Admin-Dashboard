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
      value: professional.filter((m) => m.isVerified).length,
    },
    {
      title: "Approved Professionals",
      value: professional.filter((m) => m.isVerified).length,
    },
    {
      title: "Pending Professionals",
      value: professional.filter((m) => !m.isVerified).length,
    },
  ];

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

            {/* Search input */}
            {active === "client" && <div className="w-full md:w-[300px] flex items-center border rounded-full border-[#121212]/40 px-3 py-2">
              <input
                type="text"
                placeholder="Search Client"
                className="w-full outline-none text-sm font-medium"
              />
              <Icon
                icon="mdi:magnify"
                width="20"
                height="20"
                className="text-[#121212BF]"
              />
            </div>}
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

          {/* Table */}
          <div className="overflow-x-auto rounded-md border h-full">
            <table className="w-full text-left rounded-md spacing-y-4">
              <thead className="bg-[#F5F5F5] h-[64px] text-sm font-semibold mb-2">
                <tr>
                  {active === "professional" ? (
                    <>
                      <th className="text-center">S/N</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Location</th>
                      <th className="text-center">Verification</th>
                      <th className="text-center">Payment</th>
                    </>
                  ) : (
                    <>
                      <th className="text-center">S/N</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Location</th>
                      <th className="text-center">Verification</th>
                      <th className="text-center">Rate</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="space-x-2 space-y-4">
                {active === "professional"
                  ? professional.map((item, idx) => (
                    <tr
                      key={idx}
                      className="bg-[#E1E1E1]/70 hover:bg-[#E1E1E1] text-sm text-center rounded-md cursor-pointer h-fit"
                      onClick={() => openDetails(item)}
                    >
                      <td className="px-4 py-2 text-center">
                        {item?.number ?? idx + 1}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-base">{`${item.firstName} ${item.lastName}`}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item?.email}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item?.address ?? 'Not Specified'}
                      </td>
                      <td className={`px-4 py-2 font-medium text-center ${item.identityVerified
                        ? 'text-[#319F43]' : 'text-[#FF0000]'}`}>
                        {item.identityVerified ? 'Approved' : 'Pending'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item?.payment ?? 'Not Specified'}
                      </td>
                    </tr>
                  ))
                  : clients.map((item, idx) => (
                    <tr
                      key={idx}
                      className="bg-[#E1E1E1]/70 hover:bg-[#E1E1E1] text-sm text-center rounded-md cursor-pointer h-fit"
                      onClick={() => openDetails(item)}
                    >
                      <td className="px-4 py-2 text-center">
                        {item?.number ?? idx + 1}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="text-left">
                          <p className="text-base">{`${item.firstName} ${item.lastName}`}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <p className="text-base">{item.email}</p>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item?.address ?? 'Not Specified'}
                      </td>
                      <td className={`px-4 py-2 font-medium ${item.isVerified ? 'text-[#319F43]' : 'text-[#FF0000]'}`}>
                        {item.isVerified ? 'Approved' : 'Pending'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item?.payment ?? 'Not Specified'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
