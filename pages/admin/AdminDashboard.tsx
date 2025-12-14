import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { dataService } from '../../services/mockService';
import { DashboardStats, Application, ApplicationStatus } from '../../types';
import { TrendingUp, Users, FileText, DollarSign, Download, Search } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, cData, appsData] = await Promise.all([
          dataService.getStats(),
          dataService.getChartData(),
          dataService.getRecentApplications()
        ]);
        setStats(statsData);
        setChartData(cData);
        setRecentApps(appsData);
      } catch (e) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="flex h-full items-center justify-center p-12"><div className="animate-pulse text-slate-400">Loading Dashboard...</div></div>;

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-medium text-slate-900">{label}</p>
          <p className="text-indigo-600">Admissions: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPROVED: return 'bg-green-100 text-green-800';
      case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-800';
      case ApplicationStatus.UNDER_REVIEW: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
           <p className="text-slate-500">Welcome back, here is what's happening today.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
          { title: 'Total Applications', value: stats?.totalApplications, icon: FileText, color: 'text-blue-600' },
          { title: 'Pending Review', value: stats?.pendingReview, icon: TrendingUp, color: 'text-yellow-600' },
          { title: 'Active Agents', value: stats?.activeAgents, icon: Users, color: 'text-purple-600' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-slate-50 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
               <span className="text-green-600 font-medium flex items-center">
                 <TrendingUp className="h-3 w-3 mr-1" /> +12%
               </span>
               <span className="text-slate-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Admissions Overview</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
                <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / List */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
             <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
          </div>
          <div className="flex-1 overflow-auto">
             <div className="space-y-4">
               {recentApps.map((app) => (
                 <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                       <p className="text-sm font-semibold text-slate-900">{app.studentName}</p>
                       <p className="text-xs text-slate-500">{app.courseTitle}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;