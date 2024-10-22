import React, { useState } from 'react';
import { BarChart, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Type definitions
interface TrendDataPoint {
  month: string;
  value: number;
  approvalRate: number;
}

interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'review';
}

interface RiskLevelProps {
  level: 'low' | 'medium' | 'high';
}

interface LoanApplication {
  id: string;
  applicant: string;
  amount: number;
  riskLevel: RiskLevelProps['level'];
  creditScore: number;
  status: StatusBadgeProps['status'];
  date: string;
}

// Mock data for trends
const trendData: TrendDataPoint[] = [
  { month: 'Jan', value: 12.4, approvalRate: 85 },
  { month: 'Feb', value: 13.2, approvalRate: 82 },
  { month: 'Mar', value: 14.8, approvalRate: 88 },
  { month: 'Apr', value: 13.9, approvalRate: 84 },
  { month: 'May', value: 15.2, approvalRate: 86 },
  { month: 'Jun', value: 16.1, approvalRate: 89 }
];

// Simple card component to replace shadcn Card
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const Dashboard: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<StatusBadgeProps['status'] | 'all'>('all');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter'>('week');

  // Status badge component
  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const styles: Record<StatusBadgeProps['status'], string> = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      review: "bg-blue-100 text-blue-800"
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Risk Level Component
  const RiskLevel: React.FC<RiskLevelProps> = ({ level }) => {
    const styles: Record<RiskLevelProps['level'], string> = {
      low: "text-green-600",
      medium: "text-yellow-600",
      high: "text-red-600"
    };
    return (
      <span className={`font-semibold ${styles[level]}`}>
        {level.toUpperCase()}
      </span>
    );
  };

  // Sample loan applications data
  const loanApplications: LoanApplication[] = [
    {
      id: 'APP-2023-001',
      applicant: 'John Doe',
      amount: 50000,
      riskLevel: 'low',
      creditScore: 750,
      status: 'approved',
      date: '2024-03-15'
    },
    {
      id: 'APP-2023-002',
      applicant: 'Jane Smith',
      amount: 75000,
      riskLevel: 'medium',
      creditScore: 680,
      status: 'review',
      date: '2024-03-14'
    },
    {
      id: 'APP-2023-003',
      applicant: 'Robert Johnson',
      amount: 125000,
      riskLevel: 'high',
      creditScore: 620,
      status: 'pending',
      date: '2024-03-13'
    }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-3">
                <BarChart className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Loans</p>
                <p className="text-2xl font-semibold text-gray-900">1,284</p>
                <p className="text-sm text-green-600">↑ 12.5% from last month</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-3">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Loan Volume</p>
                <p className="text-2xl font-semibold text-gray-900">$12.4M</p>
                <p className="text-sm text-green-600">↑ 8.3% from last month</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full p-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Borrowers</p>
                <p className="text-2xl font-semibold text-gray-900">957</p>
                <p className="text-sm text-green-600">↑ 5.2% from last month</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-red-500 rounded-full p-3">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">At-Risk Loans</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
                <p className="text-sm text-red-600">↑ 2 from last week</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loan Volume Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Volume (M)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Approval Rate Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="approvalRate" stroke="#10b981" name="Approval Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Loan Applications</h3>
            <div className="flex gap-4">
              <select 
                className="border rounded-md px-3 py-1"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as StatusBadgeProps['status'] | 'all')}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="review">Under Review</option>
              </select>
              <select 
                className="border rounded-md px-3 py-1"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as 'week' | 'month' | 'quarter')}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loanApplications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{application.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.applicant}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(application.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><RiskLevel level={application.riskLevel} /></td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.creditScore}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={application.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
