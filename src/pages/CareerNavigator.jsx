import React, { useState } from 'react';
import { getCareerRecommendation } from '../services/gemini';
import { Loader2, Compass, MapPin, BookOpen } from 'lucide-react';

export default function CareerNavigator() {
  const [formData, setFormData] = useState({
    gpa: '',
    budget: '',
    country: 'Any',
    field: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const recommendation = await getCareerRecommendation(formData);
      if (!recommendation) {
        setError('Gemini AI failed to connect. Did you add the API Key?');
      } else {
        setResult(recommendation);
      }
    } catch (err) {
      setError('An error occurred while generating recommendations. Check console or API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          <Compass className="text-primary-600" /> AI Career Navigator
        </h1>
        <p className="text-slate-600">Tell us your academic profile, and our AI will suggest the best paths.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Field of Interest</label>
            <input required type="text" placeholder="e.g. Computer Science, MBA" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">GPA / Percentage</label>
            <input required type="text" placeholder="e.g. 8.5 CGPA or 82%" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Total Budget (INR)</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}
            >
              <option value="">Select Range</option>
              <option value="Under 20 Lakhs">Under 20 Lakhs</option>
              <option value="20-40 Lakhs">20 - 40 Lakhs</option>
              <option value="40-60 Lakhs">40 - 60 Lakhs</option>
              <option value="60+ Lakhs">60+ Lakhs</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Preferred Region</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}
            >
              <option value="Any">Any / Don't Know</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Europe (Germany/France)">Europe (Germany/France)</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit" 
              disabled={loading || !formData.budget}
              className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? <><Loader2 className="animate-spin" size={20}/> AI is thinking...</> : "Generate AI Recommendations"}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-primary-500/10 border border-primary-100 animate-in fade-in space-y-8">
          <div className="bg-primary-50 text-primary-900 p-4 rounded-lg border border-primary-200 text-sm italic">
            "{result.explanation}"
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2"><MapPin className="text-green-500"/> Suggested Countries</h3>
              <ul className="space-y-2">
                {result.countries.map((c, i) => (
                  <li key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">{c}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2"><BookOpen className="text-blue-500"/> Suggested Courses</h3>
              <ul className="space-y-2">
                {result.courses.map((c, i) => (
                  <li key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
