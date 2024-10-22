import React from 'react';
import { BarChart, DollarSign, Users, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full p-3">
            <BarChart className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Loans</p>
            <p className="text-2xl font-semibold text-gray-900">1,284</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full p-3">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Loan Volume</p>
            <p className="text-2xl font-semibold text-gray-900">$12.4M</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-yellow-500 rounded-full p-3">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Active Borrowers</p>
            <p className="text-2xl font-semibold text-gray-900">957</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-red-500 rounded-full p-3">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">At-Risk Loans</p>
            <p className="text-2xl font-semibold text-gray-900">24</p>
          </div>
        </div>
      </div>
      
      {/* Recent Applications */}
      <div className="col-span-full mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Loan Applications</h3>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample data - replace with actual data in a real application */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">$50,000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2023-03-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap">$75,000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2023-03-14</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;