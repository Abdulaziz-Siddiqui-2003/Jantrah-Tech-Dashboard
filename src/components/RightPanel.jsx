import React from 'react';
import ProfileWidget from './ProfileWidget';
import { GROUPS, MEMBERS } from '../data/mockData';

export default function RightPanel() {
  return (
    <div className="lg:col-span-4 xl:col-span-4 space-y-6">
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">Profile</h3>
            <button className="text-[10px] text-[#7B2CBF] font-semibold">Edit</button>
        </div>
        <ProfileWidget />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Groups</h3>
          <button className="text-[10px] text-[#7B2CBF] font-semibold">View All</button>
        </div>
        <div className="space-y-4">
          {GROUPS.map((group, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {group.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{group.name}</h4>
                <p className="text-xs text-gray-500">{group.members}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Members</h3>
          <button className="text-[10px] text-[#7B2CBF] font-semibold">View All</button>
        </div>
        <div className="space-y-4">
          {MEMBERS.map((member, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${member.status.includes('Active') ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
                <p className="text-xs text-gray-500">{member.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}