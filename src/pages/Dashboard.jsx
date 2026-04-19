import React, { useState, useEffect } from 'react';
import { User, LogIn, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('edupath_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    const newUser = { name: nameInput, joined: new Date().toISOString() };
    localStorage.setItem('edupath_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('edupath_user');
    setUser(null);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-6">
        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome to EduPath</h2>
          <p className="text-slate-500 mt-2">Enter your name to start your journey.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name (e.g. Anji)"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button type="submit" className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2">
            Continue <ArrowRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hi, {user.name}! 👋</h1>
          <p className="text-slate-500 mt-2">Ready to plan your study abroad journey?</p>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-red-500 font-medium transition"
        >
          Sign Out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Saved Recommendations</h3>
          <p className="text-slate-500 italic text-sm">No courses saved yet. Use the Career Navigator to find courses!</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Your Profile</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><strong>Status:</strong> Exploring 🌎</li>
            <li><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
