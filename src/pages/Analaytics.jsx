import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bar, BarChart, ComposedChart } from "recharts";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import Topbar from "../components/Topbar";

ChartJS.register(ArcElement, ChartTooltip, Legend);

function Analaytics() {
  const data = [
    { day: "Sun", tasks: 500 },
    { day: "Mon", tasks: 1000 },
    { day: "Tue", tasks: 1500 },
    { day: "Wed", tasks: 2000 },
    { day: "Thu", tasks: 1800 },
    { day: "Fri", tasks: 1400 },
    { day: "Sat", tasks: 1600 },
  ];

  const revenue = 356000;
  const withdrawal = 204000;

  const chartData = {
    labels: ["Revenue", "Withdrawal"],
    datasets: [
      {
        data: [revenue, withdrawal],
        backgroundColor: ["#7800F8", "#E33629"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-10">
      <Topbar title="Analytics" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
        {/* Left: Task Progress */}
        <div className="md:col-span-3 rounded-lg border flex flex-col">
          <div className="flex justify-between items-center p-4 sm:p-6">
            <h2 className="font-semibold text-lg">Task Progress</h2>
            <div className="flex">
              <span className="border text-sm px-2.5 py-1 cursor-pointer bg-white hover:bg-[#121212] hover:text-white border-[#121212]/50 hover:border-[#121212]">
                Daily
              </span>
              <span className="border text-sm px-2.5 py-1 cursor-pointer bg-white hover:bg-[#121212] hover:text-white border-[#121212]/50 hover:border-[#121212]">
                Weekly
              </span>
              <span className="border text-sm px-2.5 py-1 cursor-pointer bg-white hover:bg-[#121212] hover:text-white border-[#121212]/50 hover:border-[#121212]">
                Monthly
              </span>
            </div>
          </div>

          {/* FIX: give a strict chart wrapper height */}
          <div className="w-full h-[200px] sm:h-[240px] md:h-[280px] px-2 sm:px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#014F8E"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Revenue Doughnut */}
        <div className="md:col-span-1 border rounded-lg p-4 sm:p-6 flex flex-col items-center justify-between">
          <h2 className="text-base font-semibold">Revenue</h2>
          <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 my-3">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="text-center">
            <span className="text-sm font-semibold block">Total</span>
            <span className="text-lg font-bold">
              ${(revenue + withdrawal) / 1000}k
            </span>
          </div>

          <div className="mt-4 flex gap-3">
            <div className="flex flex-col items-center p-2 bg-[#61B1F114]">
              <span className="text-sm font-semibold">$365k</span>
              <span className="text-xs flex items-center gap-1">
                <span className="text-lg leading-none">•</span> Deposit
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-[#61B1F114]">
              <span className="text-sm font-semibold">$204k</span>
              <span className="text-xs flex items-center gap-1">
                <span className="text-lg leading-none">•</span> Withdraw
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Users Bar Chart */}
      <div className="rounded-lg border p-4 sm:p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Users</h2>
          <div className="flex space-x-6">
            <span className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#014F8E]" />
              <span>Professional</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#E33629]" />
              <span>Client</span>
            </span>
          </div>
        </div>

        <div className="w-full h-[220px] sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { day: "Sun", professional: 2000, client: 1500 },
                { day: "Mon", professional: 1500, client: 1000 },
                { day: "Tue", professional: 1000, client: 500 },
                { day: "Wed", professional: 500, client: 0 },
                { day: "Thu", professional: 1200, client: 800 },
                { day: "Fri", professional: 1700, client: 900 },
                { day: "Sat", professional: 1400, client: 600 },
              ]}
              barSize={20}
            >
              <CartesianGrid />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="professional" fill="#014F8E" radius={[10, 10, 0, 0]} />
              <Bar dataKey="client" fill="#E33629" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default Analaytics;
