import React, { useState } from 'react';

const LoanApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    loanPurpose: '',
    creditScore: '',
    annualIncome: '',
    employmentStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">New Loan Application</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
            <input
              type="number"
              name="loanAmount"
              id="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700">Loan Purpose</label>
            <select
              name="loanPurpose"
              id="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select a purpose</option>
              <option value="home">Home Purchase</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div>
            <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700">Credit Score</label>
            <input
              type="number"
              name="creditScore"
              id="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">Annual Income ($)</label>
            <input
              type="number"
              name="annualIncome"
              id="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">Employment Status</label>
            <select
              name="employmentStatus"
              id="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select status</option>
              <option value="fullTime">Full-time</option>
              <option value="partTime">Part-time</option>
              <option value="selfEmployed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApplication;