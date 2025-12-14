import React, { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, IndianRupee, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { dataService } from '../../services/mockService';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dataService.getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.college.toLowerCase().includes(searchTerm.toLowerCase());
    // Mock category logic since our type doesn't have category yet
    const matchesCategory = selectedCategory === 'All' ? true : course.title.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Nursing', 'Engineering', 'Management', 'Pharmacy'];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Explore Our Courses</h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Find the perfect program to launch your career from top-rated universities and colleges.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
              placeholder="Search courses or colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <Filter className="h-5 w-5 text-slate-400 mr-2 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 w-full bg-slate-200 relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                    {course.code}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600 mb-1">{course.college}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                    
                    <div className="flex items-center gap-4 text-slate-500 text-sm mt-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1.5" />
                        {course.seats} Seats
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Total Fees</p>
                      <p className="text-lg font-bold text-slate-900 flex items-center">
                        <IndianRupee className="h-4 w-4 mr-0.5" />
                        {(course.fees / 100000).toFixed(1)} Lakhs
                      </p>
                    </div>
                    <Link 
                      to="/login" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      Apply <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
            <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;