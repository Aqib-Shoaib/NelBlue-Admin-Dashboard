import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import dotsVertical from "@iconify-icons/mdi/dots-vertical";

import image from "../assets/4c1a900b3b3e49a09cbd22efaee47a0cec00b79a.jpg";
import Topbar from "../components/Topbar";
import { useGetAllUsers } from "../store/useAuth";

function Users() {
  const [active, setActive] = useState("Client");
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: usersData, isLoading, isError, error } = useGetAllUsers();

  const clientData = [
    {
      name: "Jonas Blong",
      address: "35 home avenue, ontario",
      phone: "0906607126",
      category: "Car",
      vehicleType: "Tesla",
      model: "Truck20144",
    },
  ];

  const mechanicData = [
    {
      name: "Jonas Blong",
      contact: "0906607126",
      address: "35 home avenue, ontario",
      specialization: ["Buses", "Hunda"],
      status: "Approved",
    },
  ];

  // Prefer server data when available; expect shape like { clients: [], mechanics: [] } or flat users with role
  const { clients, mechanics } = useMemo(() => {
    if (!usersData) return { clients: clientData, mechanics: mechanicData };
    // Flexible handling of various shapes
    if (Array.isArray(usersData)) {
      const cli = usersData.filter((u) => (u.role || u.type) === 'client');
      const mech = usersData.filter((u) => (u.role || u.type) === 'mechanic');
      return {
        clients: cli.length ? cli : clientData,
        mechanics: mech.length ? mech : mechanicData,
      };
    }
    return {
      clients: usersData.clients?.length ? usersData.clients : clientData,
      mechanics: usersData.mechanics?.length ? usersData.mechanics : mechanicData,
    };
  }, [usersData]);

  const openDetails = (user) => {
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className="w-full h-full p-10 space-y-8">
      {/* Topbar */}
      <Topbar title="users" />

      {isLoading && (
        <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded p-2">Loading users...</div>
      )}
      {isError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error?.message || 'Failed to load users'}</div>
      )}

      {/* Controls: Toggle + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Toggle buttons */}
        <div className="flex rounded-lg border overflow-hidden">
          <button
            className={`px-6 py-2 ${
              active === "Mechanic"
                ? "bg-[#014F8E] text-white"
                : "bg-white text-[#121212]"
            }`}
            onClick={() => setActive("Mechanic")}
          >
            Mechanic
          </button>
          <button
            className={`px-6 py-2 ${
              active === "Client"
                ? "bg-[#014F8E] text-white"
                : "bg-white text-[#121212]"
            }`}
            onClick={() => setActive("Client")}
          >
            Client
          </button>
        </div>

        {/* Search input */}
        <div className="w-full md:w-[300px] flex items-center border border-[#121212]/40 rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="Search Professional"
            className="w-full outline-none text-sm"
          />
          <Icon
            icon="mdi:magnify"
            width="20"
            height="20"
            className="text-[#121212BF]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-[#F5F5F5] h-[64px] text-sm font-semibold">
            <tr>
              <th className="text-center font-semibold text-[14px]">Client</th>
              {active === "Mechanic" ? (
                <>
                  <th className="text-center">Contact</th>
                  <th className="text-center">Specialization</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </>
              ) : (
                <>
                  <th className="text-center">Contact</th>
                  <th className="text-center">Categories</th>
                  <th className="text-center">Vehicle Type</th>
                  <th className="text-center">Model</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {active === "Mechanic"
              ? mechanics.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-[#E1E1E1] text-sm text-center rounded-md"
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src={image}
                          alt={item.name}
                          className="w-8 h-8 rounded-full border"
                        />
                        <p className="text-[16px]">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <p className="text-sm">{item.address}</p>
                      <p className="text-xs text-gray-500">{item.contact}</p>
                    </td>
                    <td className="px-4 py-2">
                      {item.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 px-2 py-1 rounded text-xs mr-1"
                        >
                          {spec}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-[#319F43] font-medium">
                      {item.status}
                    </td>
                    <td
                      className="px-4 py-2 cursor-pointer"
                      onClick={() => openDetails(item)}
                    >
                      <Icon icon={dotsVertical} width="20" height="20" />
                    </td>
                  </tr>
                ))
              : clients.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-[#E1E1E1] text-sm text-center rounded-md cursor-pointer"
                    onClick={() => openDetails(item)}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src={image}
                          alt={item.name}
                          className="w-8 h-8 rounded-full border"
                        />
                        <div className="text-left">
                          <p className="text-[16px]">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.vehicleType}: {item.model}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <p className="text-sm">{item.address}</p>
                      <p className="text-xs text-gray-500">{item.phone}</p>
                    </td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.vehicleType}</td>
                    <td className="px-4 py-2">{item.model}</td>
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
