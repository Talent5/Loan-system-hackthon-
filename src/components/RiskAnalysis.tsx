import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RiskAnalysis: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Sample data - replace with actual data in a real application
  const loanData = [
    { id: 1, applicant: 'John Doe', amount: 50000, risk: 'Low' },
    { id: 2, applicant: 'Jane Smith', amount: 75000, risk: 'Medium' },
    { id: 3, applicant: 'Bob Johnson', amount: 100000, risk: 'High' },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 60 },
    { name: 'Medium Risk', value: 30 },
    { name: 'High Risk', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {riskDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Loan Applications</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loanData.map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.applicant}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${loan.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      loan.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      loan.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {loan.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleLoanSelect(loan)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedLoan && (
        <div className="col-span-full bg-white p-6 rounded-lg shadow-sm mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Applicant</p>
              <p className="mt-1 text-sm text-gray-900">{selectedLoan.applicant}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Loan Amount</p>
              <p className="mt-1 text-sm text-gray-900">${selectedLoan.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Risk Level</p>
              <p className="mt-1 text-sm text-gray-900">{selectedLoan.risk}</p>
            </div>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAnalysis;