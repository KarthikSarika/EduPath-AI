import React, { useState } from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';

export default function LoanEstimator() {
  const [familyIncome, setFamilyIncome] = useState(1000000); // 10 LPA Default
  const [courseCost, setCourseCost] = useState(4000000); // 40 L Default
  const interestRate = 10.5; // Estimated Average Interest %
  const tenureYears = 10;

  // Simple Eligibility Rule: Max loan ~ 4x annual family income, capped at course cost
  const maxEligible = Math.min(courseCost, familyIncome * 4);
  const eligibleAmount = Math.max(0, maxEligible);
  
  // EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]
  const p = eligibleAmount;
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  
  const emi = p > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          <Coins className="text-primary-600" /> Education Loan Estimator
        </h1>
        <p className="text-slate-600">Quickly check your likely eligibility for unsecured study-abroad loans.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Annual Family Income (INR)</span>
              <span className="font-bold">₹{(familyIncome/100000).toFixed(1)} Lakhs</span>
            </label>
            <input 
              type="range" min="300000" max="5000000" step="100000"
              value={familyIncome} onChange={e => setFamilyIncome(e.target.value)}
              className="w-full accent-primary-600"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Total Course Cost (Tuition + Living)</span>
              <span className="font-bold">₹{(courseCost/100000).toFixed(1)} Lakhs</span>
            </label>
            <input 
              type="range" min="1000000" max="10000000" step="500000"
              value={courseCost} onChange={e => setCourseCost(e.target.value)}
              className="w-full accent-primary-600"
            />
          </div>
        </div>

        <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="space-y-1 w-full text-center md:text-left border-b md:border-b-0 md:border-r border-primary-200 pb-4 md:pb-0 pr-0 md:pr-4">
            <h4 className="text-primary-700 text-sm font-medium uppercase tracking-wider">Eligible Loan Amount</h4>
            <p className="text-3xl font-bold text-primary-900">₹{(eligibleAmount/100000).toFixed(1)} L</p>
          </div>
          
          <div className="space-y-1 w-full text-center md:text-left">
            <h4 className="text-primary-700 text-sm font-medium uppercase tracking-wider">Estimated Monthly EMI</h4>
            <div className="flex items-end justify-center md:justify-start gap-2">
              <p className="text-3xl font-bold text-primary-900">₹{Math.round(emi).toLocaleString('en-IN')}</p>
              <p className="text-sm text-primary-700 font-medium mb-1">/ mo</p>
            </div>
            <p className="text-xs text-primary-600">@{interestRate}% for {tenureYears} years</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button className="w-full py-4 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-1 transition flex justify-center items-center gap-2">
            <CheckCircle2 size={20}/> Apply for Loan Pre-Approval
          </button>
          <p className="text-center text-xs text-slate-500 max-w-lg mx-auto">
            Note: This is an estimated calculation based on standard market models. Actual approval is subject to banking partners and specific co-applicant profiles.
          </p>
        </div>

      </div>
    </div>
  );
}
