import React from "react";
import { Icon } from "@iconify/react";
import dollarIcon from "@iconify-icons/mdi/dollar";
import {
  XAxis,
  Area,
  AreaChart,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import image from "../assets/4c1a900b3b3e49a09cbd22efaee47a0cec00b79a.jpg";
import Topbar from "../components/Topbar";
import { useAdminDashboard } from "../store/useDashboard";
function Dashboard() {
  const { data: dashboard, isLoading, isError, error } = useAdminDashboard();
  const data = (dashboard && dashboard.chartData) || [
    { day: "Sun", tasks: 500 },
    { day: "Mon", tasks: 1000 },
    { day: "Tue", tasks: 1500 },
    { day: "Wed", tasks: 2000 },
    { day: "Thu", tasks: 1800 },
    { day: "Fri", tasks: 1400 },
    { day: "Sat", tasks: 1600 },
  ];

  console.log(dashboard, isLoading, isError, error);

  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-10">
      <Topbar title="Dashboard" subTitle="See the world from here" />
      {isLoading && (
        <div className="mb-3 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded p-2">Loading dashboard...</div>
      )}
      {isError && (
        <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error?.message || 'Failed to load dashboard'}</div>
      )}
      <div className="rounded-lg flex flex-col md:flex-row gap-3 my-4">
        <div className="flex-1 h-[100px] rounded-lg flex items-center justify-between px-6 py-7 border border-[#121212]/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#014F8E]">
            <Icon
              icon={dollarIcon}
              className="text-[#ffffff]"
              width="20"
              height="20"
            />
          </div>

          {/* Right side content */}
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-semibold">
              {dashboard?.revenue ?? '$15,000'}
            </span>
            <span className=" text-gray-500">Revenue</span>
          </div>
        </div>
        <div className="flex-1 h-[100px] rounded-lg flex items-center justify-between px-6 py-7 border border-[#121212]/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#014F8E]">
            <Icon
              icon="hugeicons:loading-03"
              className="text-[#ffffff]"
              width="20"
              height="20"
            />
          </div>

          {/* Right side content */}
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-semibold">
              {dashboard?.ongoingPayments ?? 278}
            </span>
            <span className=" text-gray-500">Ongoing</span>
          </div>
        </div>
        <div className="flex-1 h-[100px] rounded-lg flex items-center justify-between px-6 py-7 border border-[#121212]/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#014F8E]">
            <Icon
              icon="mingcute:check-fill"
              className="text-[#ffffff]"
              width="20"
              height="20"
            />
          </div>

          {/* Right side content */}
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-semibold">
              {dashboard?.completedPayments ?? 150}
            </span>
            <span className="text-gray-500">Completed</span>
          </div>
        </div>
        <div className="flex-1 h-[100px] rounded-lg flex items-center justify-between px-6 py-7 border border-[#121212]/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#014F8E]">
            <Icon
              icon="proicons:cancel"
              className="text-[#ffffff]"
              width="20"
              height="20"
            />
          </div>

          {/* Right side content */}
          <div className="flex flex-col justify-start">
            <span className="text-2xl font-semibold">
              {dashboard?.canceledPayments ?? 24}
            </span>
            <span className="text-gray-500">Cancelled</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full min-h-[300px]">
        {/* Left: Task Progress */}
        <div className="lg:col-span-3 rounded-lg border border-[#121212]/50 p-4 sm:p-5">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[20px]">Task Progress</h2>
            <div className="flex">
              <span className="border text-sm px-2.5 py-1 text-center text-[#12121280]/50 hover:text-white cursor-pointer bg-white hover:bg-[#121212] border-[#121212]/50 hover:border-[#121212]">
                Daily
              </span>
              <span className="border text-sm px-2.5 py-1 text-center text-[#12121280]/50 hover:text-white cursor-pointer bg-white hover:bg-[#121212] border-[#121212]/50 hover:border-[#121212]">
                Weekly
              </span>
              <span className="border text-sm px-2.5 py-1 text-center text-[#12121280]/50 hover:text-white cursor-pointer bg-white hover:bg-[#121212] border-[#121212]/50 hover:border-[#121212]">
                Monthly
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="w-full my-3 h-[220px] sm:h-[260px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#67BD8C" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#E1E1E1" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E1E1E1",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="#67BD8C"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTasks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: New User Card */}
        <div className="lg:col-span-1 border border-[#12121280] flex flex-col rounded-lg p-4">
          {/* Title */}
          <div className="flex justify-between">
            <h2 className="font-semibold text-base">New User</h2>
            <span className="text-sm text-[#014F8E] hover:underline cursor-pointer">See All</span>
          </div>

          {/* Content */}
          <div className=" mt-4">
            <div className="flex items-center justify-between border rounded-sm p-2.5">
              {/* Image + Name/Role */}
              <div className="flex items-center">
                <img
                  src={image}
                  alt="User"
                  className="w-6 h-6 rounded-sm"
                />
                <div className="ml-4 flex flex-col justify-start">
                  <p className="font-semibold text-xs">John Doe</p>
                  <p className="text-[10px] text-[#121212BF]/75">
                    Client
                  </p>
                </div>
              </div>

              {/* Status + Time */}
              <div className="text-right">
                <p className="text-[#319F43]  text-[8px] font-medium">
                  Approved
                </p>
                <p className="text-[8px] text-[#121212]/30">10 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[250px] border rounded-md overflow-x-hidden mt-4 p-2 sm:p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold">Project</h2>
        {/* Table */}
        <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full table-auto text-left border-separate border-spacing-y-3">
          {/* Table Head */}
          <thead className="bg-[#F5F5F5] h-16 text-sm font-semibold">
            <tr>
              <th className="text-center font-semibold text-[14px]">
                Client
              </th>
              <th className="text-center font-semibold text-[14px]">
                Task
              </th>
              <th className="text-center font-semibold text-[14px]">Date</th>
              <th className="text-center font-semibold text-[14px]">Time</th>
              <th className="text-center font-semibold text-[14px]">Amount</th>
              <th className="text-center font-semibold text-[14px]">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="text-sm text-center bg-[#E1E1E1]/25 rounded-md">
              <td className="px-4 py-2">
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={image}
                    alt="Jonas Blong"
                    className="w-8 h-8 rounded-full border"
                  />
                  <div className="text-left flex flex-col">
                    <p className="text-md text-base">Jonas Blong</p>
                    <p className="text-xs text-gray-500">Tesla: Truck20144</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-2 flex items-center justify-center" >
                <div className="flex flex-col items-start">
                  <p className="text-base border-l-2 text-left border-[#023AA2] my-0.5 px-1.5">Brake Pad Servicing</p>
                  <p className="text-base border-l-2 text-left border-[#023AA2] my-0.5 px-1.5">Gear oil maintenance</p>
                </div>
              </td>
              <td className="px-4 py-2">25/03/2025</td>
              <td className="px-4 py-2">3PM</td>
              <td className="px-4 py-2">$500</td>
              <td className="px-4 py-2 text-green-600 font-medium">
                Completed
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
