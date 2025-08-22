import React, { useState } from "react";
import { Icon } from "@iconify/react";
import dotsVertical from "@iconify-icons/mdi/dots-vertical";

import image from "../assets/4c1a900b3b3e49a09cbd22efaee47a0cec00b79a.jpg";
import Topbar from "../components/Topbar";
import { useGetAllUsers } from "../store/useAuth";
import FullPageSpinner from "../components/FullPageSpinner";

function Users() {
  const [active, setActive] = useState("Client");
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: usersData, isLoading, isError, error } = useGetAllUsers();


  const openDetails = (user) => {
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  if (isLoading) return <FullPageSpinner />
  const clients = usersData.filter((u) => u.role.toLowerCase() === 'client')
  const mechanics = usersData.filter((u) => u.role.toLowerCase() === 'mechanic')

  console.log(clients, mechanics, isLoading);

  const ProfessionalStats = [
    {
      title: "Total Professionals",
      value: mechanics.length,
    },
    {
      title: "New Professionals",
      value: mechanics.filter((m) => m.isVerified).length,
    },
    {
      title: "Approved Professionals",
      value: mechanics.filter((m) => m.isVerified).length,
    },
    {
      title: "Pending Professionals",
      value: mechanics.filter((m) => !m.isVerified).length,
    },
  ]

  return (
    <div className="w-full h-full p-10 space-y-8">
      {/* Topbar */}
      <Topbar title="users" />

      {isError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error?.message || 'Failed to load users'}</div>
      )}

      {/* Controls: Toggle + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Toggle buttons */}
        <div className="flex gap-2">
          <button
            className={`px-6 py-2 rounded-lg text-lg font-medium ${active === "Mechanic"
              ? "bg-[#014F8E] text-white"
              : "bg-white text-[#121212]"
              }`}
            onClick={() => setActive("Mechanic")}
          >
            Professional
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-lg font-medium ${active === "Client"
              ? "bg-[#014F8E] text-white"
              : "bg-white text-[#121212]"
              }`}
            onClick={() => setActive("Client")}
          >
            Client
          </button>
        </div>

        {/* Search input */}
        {active === "Client" && <div className="w-full md:w-[300px] flex items-center border rounded-full border-[#121212]/40 px-3 py-2">
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

      {active === "Mechanic" && (
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
              {active === "Mechanic" ? (
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
            {active === "Mechanic"
              ? mechanics.map((item, idx) => (
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
                  <td className={`px-4 py-2 font-medium text-center ${item.isVerified ? 'text-[#319F43]' : 'text-[#FF0000]'}`}>
                    {item.isVerified ? 'Approved' : 'Pending'}
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

      {/* View Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Project Details</h3>
              <button
                onClick={closeDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* User Info */}
            <div className="w-full h-[85px] bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={image}
                  alt={selectedUser.name}
                  className="w-[50px] h-[50px] rounded-full border"
                />
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-xs">Client</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Tesla</p>
                <p className="text-sm text-gray-600">Truck20144</p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-[#F5F5F5] rounded-lg p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={image}
                    alt={selectedUser.name}
                    className="w-[50px] h-[50px] rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{selectedUser.name}</p>
                    <p className="text-xs">Mechanic</p>
                  </div>
                </div>
                <div className="flex gap-2 px-3 py-1 bg-[#C4D9FF]/55 rounded">
                  <p className="text-sm">Buses</p>
                  <p className="text-sm">Honda</p>
                </div>
              </div>

              <hr />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>25/05/2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Plan</p>
                  <p>Milestone</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Fee</p>
                  <p>$400</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p>3PM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p>Card</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600">Completed</p>
                </div>
              </div>

              <hr />

              {/* Services */}
              <div>
                <p className="text-sm font-semibold mb-2">Services</p>
                <ul className="space-y-2">
                  <li className="flex items-center px-2 border-l-2 border-[#023AA2]">
                    Brake Pad Servicing
                  </li>
                  <li className="flex items-center px-2 border-l-2 border-[#023AA2]">
                    Gear oil maintenance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
