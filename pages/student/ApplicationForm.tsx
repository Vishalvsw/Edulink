import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Upload, Loader2 } from 'lucide-react';

const steps = ['Personal Details', 'Course Selection', 'Documents', 'Review'];

const ApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application Submitted Successfully!");
      navigate('/student/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">New Application</h1>
        <p className="text-slate-500">Complete the steps below to apply for your desired course.</p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center bg-slate-50 px-2">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  index <= currentStep 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-indigo-600' : 'text-slate-400'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-6">
        {/* Step 1: Personal Details */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="+91 98765 43210" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Course Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Select Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Desired College</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Select College</option>
                  <option>City Medical Institute</option>
                  <option>Tech Valley University</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Course</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Select Course</option>
                  <option>B.Sc. Nursing</option>
                  <option>Computer Science Engineering</option>
                  <option>MBA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Intake Session</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>2024 - Fall</option>
                  <option>2025 - Spring</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Upload Documents</h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                'High School Marksheet (10th)',
                'Intermediate Marksheet (12th)',
                'Aadhar Card / ID Proof',
                'Passport Size Photo'
              ].map((doc) => (
                <div key={doc} className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-sm font-medium text-slate-900">{doc}</p>
                  <p className="text-xs text-slate-500 mt-1">Click to upload or drag and drop (PDF/JPG)</p>
                  <input type="file" className="hidden" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
             <div className="text-center py-6">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Review Application</h2>
                <p className="text-slate-500">Please verify your details before final submission.</p>
             </div>
             
             <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                   <span className="text-slate-500">Name</span>
                   <span className="font-medium">John Doe</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                   <span className="text-slate-500">Course</span>
                   <span className="font-medium">B.Sc. Nursing</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                   <span className="text-slate-500">College</span>
                   <span className="font-medium">City Medical Institute</span>
                </div>
                <div className="flex justify-between pt-2">
                   <span className="text-slate-500">Application Fee</span>
                   <span className="font-bold text-indigo-600">₹1,500</span>
                </div>
             </div>
             
             <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I declare that the information provided is true and correct. I agree to the <a href="#" className="text-indigo-600 underline">terms and conditions</a>.
                </label>
             </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || isSubmitting}
          className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : currentStep === steps.length - 1 ? 'Submit Application' : (
            <>
              Next Step <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;