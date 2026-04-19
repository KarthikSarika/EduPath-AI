import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, BookOpen, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8"
    >
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
          Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Study Abroad</span> Mentor
        </h1>
        <p className="text-xl text-slate-600">
          Plan your higher education, calculate ROI, and discover loan options designed specifically for Indian students.
        </p>
      </div>

      <div className="flex gap-4">
        <Link 
          to="/dashboard" 
          className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition shadow-lg shadow-primary-500/30 flex items-center gap-2"
        >
          Get Started <ArrowRight size={20} />
        </Link>
        <Link 
          to="/navigator" 
          className="px-8 py-3 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition border border-slate-200"
        >
          Explore Courses
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-16">
        {[
          { title: "AI Career Navigator", desc: "Get AI-recommended courses & countries based on your budget and GPA.", icon: Globe2, to:"/navigator" },
          { title: "ROI Calculator", desc: "Calculate the exact timeline to recover your investment after studies.", icon: BookOpen, to: "/roi" },
          { title: "Loan Estimator", desc: "Check eligibility and estimate EMIs for Indian education loans instantly.", icon: Coins, to: "/loans" }
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Link key={i} to={feature.to} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition text-left space-y-4 group">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </Link>
          )
        })}
      </div>
    </motion.div>
  );
}
