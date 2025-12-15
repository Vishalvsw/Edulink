import React, { useEffect, useState } from 'react';
import { Users, DollarSign, CheckCircle, Clock, TrendingUp, UserPlus, Filter, Wallet, ArrowUpRight } from 'lucide-react';
import { dataService } from '../../services/mockService';
import { AgentStats, Application, ApplicationStatus } from '../../types';

const AgentDashboard: React.FC = () => {
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [leads, setLeads] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, leadsData] = await Promise.all([
          dataService.getAgentStats(),
          dataService.getRecentApplications() // Reusing applications as leads for demo
        ]);
        setStats(statsData);
        setLeads(leadsData);
      } catch (error) {
        console.error("Failed to load agent data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="animate-pulse text-slate-400">Loading Dashboard...</div>
      </div>
    );
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPROVED: return 'bg-green-100 text-green-800';
      case ApplicationStatus.ENROLLED: return 'bg-indigo-100 text-indigo-800';
      case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-800';
      case ApplicationStatus.FEE_PENDING: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agent Dashboard</h1>
          <p className="text-slate-500">Track your performance and manage student applications.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-medium text-white hover:bg-indigo-700 shadow-sm transition-colors">
          <UserPlus className="h-5 w-5 mr-2" />
          Add New Lead
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Leads</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stats?.totalLeads}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span className="font-medium">+5</span>
            <span className="text-slate-400 ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Conversions</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stats?.conversions}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            <span className="font-medium text-slate-900">26.6%</span>
            <span className="ml-2">conversion rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Commissions</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{stats?.pendingCommissions.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-400">
            Next payout on 15th Nov
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Earnings</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{stats?.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
             <TrendingUp className="h-3 w-3 mr-1" />
             <span className="font-medium">+12%</span>
             <span className="text-slate-400 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Financial Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Earnings Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Financial Overview</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View Full Report</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Total Earnings</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{stats?.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
              <p className="text-xs font-medium text-yellow-700 uppercase tracking-wide">Pending</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{stats?.pendingCommissions.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <p className="text-xs font-medium text-green-700 uppercase tracking-wide">Available</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹5,200</p>
              <div className="mt-2 flex items-center text-xs text-green-700">
                 <CheckCircle className="h-3 w-3 mr-1" /> Ready for withdrawal
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Payouts</h3>
            <div className="space-y-3">
              {[
                { id: 'PAY-8821', date: 'Oct 15, 2023', amount: 12500, status: 'Completed' },
                { id: 'PAY-7734', date: 'Sep 15, 2023', amount: 8000, status: 'Completed' },
              ].map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Payout {payout.id}</p>
                      <p className="text-xs text-slate-500">{payout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">₹{payout.amount.toLocaleString()}</p>
                    <span className="text-xs text-green-600 font-medium">{payout.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incentive Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl text-white shadow-lg flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Next Milestone</h3>
            <p className="text-slate-300 text-sm mb-6">
              Reach ₹50,000 in total earnings to unlock the Platinum Agent badge and reduce payout processing time.
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span>Progress</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">Only ₹5,000 more to go!</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2.5 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
            View Rewards
          </button>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Leads & Applications</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applied Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{lead.studentName}</div>
                    <div className="text-xs text-slate-500">ID: {lead.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{lead.courseTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{lead.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;