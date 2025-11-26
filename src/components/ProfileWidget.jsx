import React from 'react';
import { CURRENT_USER } from '../data/mockData';

export default function ProfileWidget() {
  const percentage = 32;
  
  return (
    <div className="relative flex flex-col items-center mb-6">
      <div className="relative w-24 h-24 mb-3">
        <div className="absolute inset-0 rounded-full border-[3px] border-purple-100"></div>

        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="46.5"
            stroke="#4C1D95"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="292"
            strokeDashoffset={292 - (292 * percentage) / 100}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white">
          <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-0 right-0 bg-[#7B2CBF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
          32%
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-lg">{CURRENT_USER.name}</h3>
      <p className="text-gray-500 text-xs mb-4">Profile Completion: 32%</p>

      <div className="w-full space-y-3">
        {[
          { label: 'Profile Photo', val: '1/1', done: true },
          { label: 'Personal Information', val: '0/2', done: false },
          { label: 'Details', val: '3/5', done: false },
          { label: 'Education', val: '0/3', done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
               <div className={`w-4 h-4 rounded-full flex items-center justify-center border
                 ${item.done ? 'bg-[#7B2CBF] border-[#7B2CBF] text-white' : 'border-gray-300 text-transparent'}`}>
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
               </div>
               <span className="text-gray-600">{item.label}</span>
            </div>
            <span className="text-gray-400">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}