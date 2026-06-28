'use client';

import { useState } from 'react';
import { trackFormSubmission } from '@/lib/analytics';

export default function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      trackFormSubmission('Application Form', true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
        <p>Thank you for applying. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-navy mb-6">Student Application</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program of Interest</label>
          <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
            <option value="">Select a program...</option>
            <option value="undergraduate">Undergraduate Degree</option>
            <option value="postgraduate">Postgraduate Degree</option>
            <option value="diploma">Diploma</option>
            <option value="certificate">Certificate</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
          <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}