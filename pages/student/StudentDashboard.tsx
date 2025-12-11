import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../../services/mockService';
import { Application, ApplicationStatus } from '../../types';
import { Clock, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching ONLY student's applications
    dataService.getRecentApplications().then(apps => {
      setApplications(apps.slice(0, 2)); // Just take a few for demo
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
        <p className="text-slate-500">Track your application progress and next steps.</p>
      </div>

      {/* Action Banner */}
      <div className="bg-indigo-600 rounded-xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
           <div>
             <h2 className="text-xl font-bold mb-2">Applications are open for 2024!</h2>
             <p className="text-indigo-100 max-w-lg">
               Don't miss the deadline. Apply for Nursing, Engineering, and Management courses today.
             </p>
           </div>
           <Link 
             to="/student/apply" 
             className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-sm whitespace-nowrap"
           >
             Start New Application
           </Link>
        </div>
        {/* Decorator */}
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <FileText className="h-64 w-64" />
        </div>
      </div>

      {/* Application Status Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Your Applications</h3>
        {loading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-32 bg-slate-200 rounded-xl"></div>
             <div className="h-32 bg-slate-200 rounded-xl"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-slate-900">{app.courseTitle}</h4>
                        <span className="text-xs font-mono text-slate-400">#{app.id.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-slate-500">Applied on {app.appliedDate}</p>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === ApplicationStatus.APPROVED ? 'bg-green-100 text-green-700' :
                      app.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status === ApplicationStatus.APPROVED ? <CheckCircle className="h-4 w-4 mr-1.5"/> :
                       app.status === ApplicationStatus.REJECTED ? <AlertCircle className="h-4 w-4 mr-1.5"/> :
                       <Clock className="h-4 w-4 mr-1.5"/>}
                      {app.status}
                    </div>
                 </div>
                 
                 {/* Progress Bar */}
                 <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium text-slate-500">
                     <span>Application Progress</span>
                     <span>{app.progress}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                     <div 
                       className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" 
                       style={{ width: `${app.progress}%` }}
                     ></div>
                   </div>
                   <div className="pt-2 text-sm text-slate-600 flex items-center justify-between">
                      <span>Next Step: {app.progress === 100 ? 'Wait for enrollment packet' : 'Complete document upload'}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                        View Details <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Need Help?</h3>
            <p className="text-sm text-slate-500 mb-4">Contact your assigned agent or our support team.</p>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
               <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">AS</div>
               <div>
                  <p className="text-sm font-medium text-slate-900">Agent Smith</p>
                  <p className="text-xs text-slate-500">+91 98765 43210</p>
               </div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Recent Payments</h3>
            <div className="text-center py-6 text-slate-400 text-sm">
               No recent payment history found.
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentDashboard;