import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  loanAmount: string;
  loanPurpose: string;
  creditScore: string;
  annualIncome: string;
  employmentStatus: string;
  monthlyDebt: string;
  employmentYears: string;
  homeOwnership: string;
  monthlyRent: string;
  bankruptcyHistory: string;
  collateral: string;
  dependents: string;
  existingLoans: string;
  businessType?: string;
  businessYears?: string;
}

const LoanApplication: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    loanAmount: '',
    loanPurpose: '',
    creditScore: '',
    annualIncome: '',
    employmentStatus: '',
    monthlyDebt: '',
    employmentYears: '',
    homeOwnership: '',
    monthlyRent: '',
    bankruptcyHistory: '',
    collateral: '',
    dependents: '',
    existingLoans: '',
    businessType: '',
    businessYears: ''
  });

  interface RiskAssessment {
    score: number;
    dti: string;
    lti: string;
    recommendation: string;
  }

  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);

  const calculateRiskScore = (data: FormData) => {
    const creditScore = Number(data.creditScore);
    const annualIncome = Number(data.annualIncome);
    const monthlyDebt = Number(data.monthlyDebt);
    const loanAmount = Number(data.loanAmount);
    const employmentYears = Number(data.employmentYears);
    const monthlyRent = Number(data.monthlyRent);
    const existingLoans = Number(data.existingLoans);

    const monthlyIncome = annualIncome / 12;
    const dti = ((monthlyDebt + monthlyRent) / monthlyIncome) * 100;
    const lti = (loanAmount / annualIncome) * 100;

    let score = 0;
    
    score += Math.min(30, ((creditScore - 300) / (850 - 300)) * 30);
    score += Math.max(0, 20 - (dti / 2));
    score += Math.min(15, employmentYears * 2);
    score += Math.max(0, 15 - (lti / 10));
    score += data.bankruptcyHistory === 'no' ? 10 : 0;
    score += data.homeOwnership === 'own' ? 5 : 2;
    score += Math.max(0, 5 - (Number(existingLoans) * 1.5));

    return {
      score: Math.round(score),
      dti: dti.toFixed(1),
      lti: lti.toFixed(1),
      recommendation: score >= 70 ? 'Approve' : score >= 50 ? 'Review' : 'Decline'
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assessment = calculateRiskScore(formData);
    setRiskAssessment(assessment);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Comprehensive Loan Application</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Personal Information</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number of Dependents</label>
                <input
                  type="number"
                  name="dependents"
                  value={formData.dependents}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-4">
              <h4 className="font-semibold">Loan Information</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Loan Purpose</label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="home">Home Purchase</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                  <option value="personal">Personal</option>
                  <option value="debt_consolidation">Debt Consolidation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Collateral Available</label>
                <select
                  name="collateral"
                  value={formData.collateral}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select option</option>
                  <option value="property">Property</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="investment">Investment Portfolio</option>
                  <option value="none">No Collateral</option>
                </select>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Financial Information</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Credit Score</label>
                <input
                  type="number"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleChange}
                  min="300"
                  max="850"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Debt Payments ($)</label>
                <input
                  type="number"
                  name="monthlyDebt"
                  value={formData.monthlyDebt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Employment & Housing */}
            <div className="space-y-4">
              <h4 className="font-semibold">Employment & Housing</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select status</option>
                  <option value="fullTime">Full-time</option>
                  <option value="partTime">Part-time</option>
                  <option value="selfEmployed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Years at Current Employment</label>
                <input
                  type="number"
                  name="employmentYears"
                  value={formData.employmentYears}
                  onChange={handleChange}
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Home Ownership</label>
                <select
                  name="homeOwnership"
                  value={formData.homeOwnership}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select option</option>
                  <option value="own">Own</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="rent">Rent</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Risk Factors */}
          <div>
            <h4 className="font-semibold mb-4">Additional Information</h4>
            <div>
              <label className="block text-sm font-medium mb-1">Previous Bankruptcy?</label>
              <select
                name="bankruptcyHistory"
                value={formData.bankruptcyHistory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Conditional Business Information */}
          {formData.loanPurpose === 'business' && (
            <div className="space-y-4">
              <h4 className="font-semibold">Business Information</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Business Type</label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Years in Business</label>
                <input
                  type="number"
                  name="businessYears"
                  value={formData.businessYears}
                  onChange={handleChange}
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>

      {riskAssessment && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Risk Assessment Results</h2>
          <div className={`p-4 rounded-md ${
            riskAssessment.recommendation === 'Approve' ? 'bg-green-50 border border-green-200' :
            riskAssessment.recommendation === 'Review' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {riskAssessment.recommendation === 'Approve' ? (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <h3 className="text-lg font-semibold">Risk Score: {riskAssessment.score}/100</h3>
            </div>
            <div className="mt-2">
              <p className="font-medium">Recommendation: {riskAssessment.recommendation}</p>
              <p>DTI Ratio: {riskAssessment.dti}%</p>
              <p>Loan-to-Income Ratio: {riskAssessment.lti}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;
