import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Shape Your Future With <span className="text-indigo-400">EduLink</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              The easiest way to apply for top colleges, track your admission status, and manage your academic journey. Trusted by 500+ Institutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-colors md:text-lg"
              >
                Find Courses
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors md:text-lg"
              >
                Student Login <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Colleges', value: '50+' },
              { label: 'Courses', value: '200+' },
              { label: 'Students', value: '10k+' },
              { label: 'Agents', value: '150+' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">Why Choose Us</h2>
            <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Streamlined Admission Process</h3>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              We bring technology to education management, making it easier for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Diverse Courses</h4>
              <p className="text-slate-500">Explore hundreds of courses across Nursing, Engineering, Management, and more from top-rated institutes.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Secure Admissions</h4>
              <p className="text-slate-500">Transparent and secure application processing with real-time status tracking and document verification.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Agent Network</h4>
              <p className="text-slate-500">A dedicated portal for agents to manage leads, track conversions, and earn commissions transparently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your journey?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of students who have found their dream colleges through EduLink.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;