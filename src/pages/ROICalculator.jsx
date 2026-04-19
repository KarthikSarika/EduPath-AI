import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

export default function ROICalculator() {
  const [tuition, setTuition] = useState(3000000);
  const [living, setLiving] = useState(1500000);
  const [salary, setSalary] = useState(4000000);
  
  const totalCost = Number(tuition) + Number(living);
  const yearsToRecover = totalCost > 0 && salary > 0 ? (totalCost / salary).toFixed(1) : 0;

  const pieData = [
    { name: 'Tuition Fees', value: Number(tuition), color: '#3b82f6' }, // blue-500
    { name: 'Living Expenses', value: Number(living), color: '#8b5cf6' } // violet-500
  ];

  const projectionData = [
    { year: 'Year 1', debt: Math.max(0, totalCost - salary), income: Number(salary) },
    { year: 'Year 2', debt: Math.max(0, totalCost - (salary*2)), income: Number(salary) },
    { year: 'Year 3', debt: Math.max(0, totalCost - (salary*3)), income: Number(salary) }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          <Calculator className="text-primary-600" /> Advanced ROI Calculator
        </h1>
        <p className="text-slate-600">Calculate and visualize your study abroad investment recovery.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Sliders panel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-xl font-semibold">Your Estimates</h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Tuition Fee</span>
                <span className="text-blue-600 font-bold">₹{(tuition/100000).toFixed(1)} L</span>
              </label>
              <input 
                type="range" min="1000000" max="10000000" step="500000"
                value={tuition} onChange={e => setTuition(e.target.value)}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Living Expenses</span>
                <span className="text-violet-600 font-bold">₹{(living/100000).toFixed(1)} L</span>
              </label>
              <input 
                type="range" min="500000" max="5000000" step="100000"
                value={living} onChange={e => setLiving(e.target.value)}
                className="w-full accent-violet-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Starting Salary</span>
                <span className="text-emerald-600 font-bold">₹{(salary/100000).toFixed(1)} L</span>
              </label>
              <input 
                type="range" min="500000" max="10000000" step="500000"
                value={salary} onChange={e => setSalary(e.target.value)}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Highlight Panel */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center space-y-8">
          <div className="space-y-2 text-center border-b border-slate-700 pb-6">
            <h3 className="text-slate-400 font-medium">Total Investment Required</h3>
            <p className="text-4xl font-bold flex justify-center items-center gap-1">
              <IndianRupee size={28} /> {totalCost.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-slate-400 font-medium">Estimated ROI Time</h3>
            <div className="flex justify-center items-end gap-2">
              <p className="text-6xl font-extrabold text-emerald-400">{yearsToRecover}</p>
              <p className="text-xl text-emerald-400/80 mb-2">Years</p>
            </div>
            <p className="text-xs text-slate-400 mt-2"> Assuming 100% earnings go to recovery.</p>
          </div>
        </div>

        {/* Charts Panel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
             <h3 className="text-sm font-bold text-slate-700 mb-2 self-start w-full">Expense Breakdown</h3>
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip formatter={(value) => `₹${(value/100000).toFixed(1)} L`} />
                   <Legend />
                 </PieChart>
               </ResponsiveContainer>
             </div>
        </div>

        {/* Recovery Projection Chart */}
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
             <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                 <TrendingUp size={20} className="text-primary-600"/> 3-Year Recovery Projection
             </h3>
             <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="year" />
                   <YAxis tickFormatter={(value) => `${value/100000}L`} />
                   <Tooltip formatter={(value) => `₹${(value/100000).toFixed(1)} L`} cursor={{fill: 'transparent'}}/>
                   <Legend />
                   <Bar dataKey="debt" name="Remaining Debt" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="income" name="Cumulative Expected Salary" fill="#10b981" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
        </div>

      </div>
    </motion.div>
  );
}
