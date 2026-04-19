import React from 'react';
import Navbar from './Navbar';
import ChatWindow from '../chat/ChatWindow';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
        <ChatWindow />
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} EduPath AI. Built for Indian Students.
        </div>
      </footer>
    </div>
  );
}
