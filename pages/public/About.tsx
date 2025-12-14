import React from 'react';
import { Target, Users, Globe, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Empowering Education For Everyone
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-indigo-200">
            We are bridging the gap between students, agents, and institutions to create a seamless admission experience.
          </p>
        </div>
      </div>

      {/* Mission Values */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Driven by purpose
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                title: 'Transparency',
                description: 'Complete visibility into the admission process for students and agents alike.'
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Building strong partnerships between educational institutes and counselors.'
              },
              {
                icon: Globe,
                title: 'Accessibility',
                description: 'Making quality education accessible to students from every corner of the country.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Committed to the highest standards of service and technological innovation.'
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto mb-6">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-base text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                 Trusted by institutes across India
               </h2>
               <p className="text-lg text-gray-500 mb-8">
                 Since our inception in 2020, EduLink has processed over 10,000 applications and partnered with 50+ premier institutions. Our platform reduces admission processing time by 40%.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                 <Link to="/contact" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-500">
                   Get in touch <ChevronRight className="ml-1 h-5 w-5" />
                 </Link>
               </div>
             </div>
             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
               <div className="grid grid-cols-2 gap-8 text-center">
                 <div className="border-r border-b border-gray-100 p-4">
                   <div className="text-4xl font-bold text-indigo-600">4+</div>
                   <div className="text-sm text-gray-500 mt-1">Years of Service</div>
                 </div>
                 <div className="border-b border-gray-100 p-4">
                   <div className="text-4xl font-bold text-indigo-600">50+</div>
                   <div className="text-sm text-gray-500 mt-1">Partner Colleges</div>
                 </div>
                 <div className="border-r border-gray-100 p-4">
                   <div className="text-4xl font-bold text-indigo-600">10k+</div>
                   <div className="text-sm text-gray-500 mt-1">Students</div>
                 </div>
                 <div className="p-4">
                   <div className="text-4xl font-bold text-indigo-600">24/7</div>
                   <div className="text-sm text-gray-500 mt-1">Support</div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;