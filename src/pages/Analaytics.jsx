import React, { useState } from "react";
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
import { useAnalytics } from "../store/useDashboard";
import Spinner from "../components/Spinner";

ChartJS.register(ArcElement, ChartTooltip, Legend);

function Analaytics() {
  const [timeFrame, setTimeFrame] = useState('daily');
  const { data: analyticsData, isLoading, error } = useAnalytics();



  const { revenue, tasks, clientProfessional } = analyticsData || {};

  // Prepare chart data based on selected time frame
  const getChartData = () => {
    if (!tasks) return [];
    
    switch (timeFrame) {
      case 'daily':
        return tasks.daily || [];
      case 'weekly':
        return tasks.weekly || [];
      case 'monthly':
        return tasks.monthly || [];
      default:
        return tasks.daily || [];
    }
  };

  const chartData = getChartData().map(item => {
    if (timeFrame === 'daily') {
      return { day: item.day, tasks: item.total || 0 };
    } else if (timeFrame === 'weekly') {
      return { period: `Week ${item.week}`, tasks: item.total || 0 };
    } else {
      return { period: `Month ${item.month}`, tasks: item.total || 0 };
    }
  });

  // Handle empty chart data
  const hasChartData = chartData.length > 0;
  const hasRevenueData = revenue && (revenue.deposits > 0 || revenue.withdrawals > 0);
  const hasUserData = clientProfessional && clientProfessional.length > 0;

  console.log(hasChartData, hasRevenueData, hasUserData)

  // Format revenue values with proper handling of zero values
  const formatRevenue = (value) => {
    if (!value || value === 0) return '0';
    return (value / 1000).toFixed(1);
  };

  const revenueChartData = {
    labels: ["Deposits", "Withdrawals"],
    datasets: [
      {
        data: [revenue?.deposits || 0, revenue?.withdrawals || 0],
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
      
      {/* Loading state - inline, doesn't cover sidebar */}
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <Spinner />
            <div className="mt-4 text-gray-600">Loading analytics data...</div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-red-500">Error loading analytics data</div>
        </div>
      )}

      {/* Content - only show when not loading */}
      {!isLoading && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
        {/* Left: Task Progress */}
        <div className="md:col-span-3 rounded-lg border flex flex-col">
          <div className="flex justify-between items-center p-4 sm:p-6">
            <h2 className="font-semibold text-lg">Task Progress</h2>
            <div className="flex">
              <span 
                className={`border text-sm px-2.5 py-1 cursor-pointer hover:bg-[#121212] hover:text-white border-[#121212]/50 hover:border-[#121212] ${
                  timeFrame === 'daily' ? 'bg-[#121212] text-white' : 'bg-white'
                }`}
                onClick={() => setTimeFrame('daily')}
              >
                Daily
              </span>
              <span 
                className={`border text-sm px-2.5 py-1 cursor-pointer hover:bg-[#121212] hover:text-white border-[#121212]/50 hover:border-[#121212] ${
                  timeFrame === 'weekly' ? 'bg-[#121212] text-white' : 'bg-white'
                }`}
                onClick={() => setTimeFrame('weekly')}
              >
                Weekly
              </span>
              <span 
                className={`border text-sm px-2.5 py-1 cursor-pointer hover:bg-[#121212] hover:text-white border-[#121212]/50 hover:border-[#121212] ${
                  timeFrame === 'monthly' ? 'bg-[#121212] text-white' : 'bg-white'
                }`}
                onClick={() => setTimeFrame('monthly')}
              >
                Monthly
              </span>
            </div>
          </div>

          {/* FIX: give a strict chart wrapper height */}
          <div className="w-full h-[200px] sm:h-[240px] md:h-[280px] px-2 sm:px-4 pb-4">
            {hasChartData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeFrame === 'daily' ? 'day' : 'period'} />
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
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-sm">No {timeFrame} data available</div>
                  <div className="text-xs text-gray-400">Data will appear here when available</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Revenue Doughnut */}
        <div className="md:col-span-1 border rounded-lg p-4 sm:p-6 flex flex-col items-center justify-between">
          <h2 className="text-base font-semibold">Revenue</h2>
          {hasRevenueData ? (
            <>
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 my-3">
                <Doughnut data={revenueChartData} options={chartOptions} />
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold block">Total</span>
                <span className="text-lg font-bold">
                  ${formatRevenue(revenue?.net)}k
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <div className="flex flex-col items-center p-2 bg-[#61B1F114]">
                  <span className="text-sm font-semibold">${formatRevenue(revenue?.deposits)}k</span>
                  <span className="text-xs flex items-center gap-1">
                    <span className="text-lg leading-none">•</span> Deposit
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#61B1F114]">
                  <span className="text-sm font-semibold">${formatRevenue(revenue?.withdrawals)}k</span>
                  <span className="text-xs flex items-center gap-1">
                    <span className="text-lg leading-none">•</span> Withdraw
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-sm">No revenue data</div>
                <div className="text-xs text-gray-400">Revenue will appear here</div>
              </div>
            </div>
          )}
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
          {hasUserData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clientProfessional || []}
                barSize={20}
              >
                <CartesianGrid />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Professional" fill="#014F8E" radius={[10, 10, 0, 0]} />
                <Bar dataKey="Client" fill="#E33629" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-sm">No user data available</div>
                <div className="text-xs text-gray-400">User statistics will appear here</div>
              </div>
            </div>
          )}
        </div>
      </div>
        </>
      )}

    </div>
  );
}

export default Analaytics;
