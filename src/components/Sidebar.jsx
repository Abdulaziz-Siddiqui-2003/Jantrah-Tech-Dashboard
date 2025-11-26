import React, { useState } from 'react';
import { 
  LayoutGrid, Users, MessageCircle, User, MessageSquare, Calendar, 
  BookOpen, GraduationCap, FileText, FilePlus, Headphones, 
  UserPlus, Crown, LogOut, ChevronUp, ChevronDown, X 
} from 'lucide-react';

import { CURRENT_USER } from '../data/mockData';


const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors duration-200
    ${active ? 'bg-[#D4F233] text-black font-semibold' : 'text-white hover:bg-white/10'}`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

const SectionHeader = ({ title, isOpen, toggle }) => (
  <div 
    className="flex items-center justify-between px-6 py-4 text-[#D4F233] font-semibold text-sm tracking-wider cursor-pointer hover:opacity-80"
    onClick={toggle}
  >
    {title}
    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </div>
);

export default function Sidebar({ mobileOpen, setMobileOpen, activeTab, setActiveTab }) {
  const [socialOpen, setSocialOpen] = useState(true);
  const [learningOpen, setLearningOpen] = useState(true);

  const socialMenuItems = [
    { id: 'news', icon: LayoutGrid, label: 'News Feed' },
    { id: 'groups', icon: Users, label: 'Groups' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'members', icon: User, label: 'Members' },
    { id: 'forums', icon: MessageSquare, label: 'Forums' },
    { id: 'events', icon: Calendar, label: 'Events' },
  ];

  const learningMenuItems = [
    { id: 'journey', icon: BookOpen, label: 'ILMF Journey' },
    { id: 'academy', icon: GraduationCap, label: 'ILMF Academy' },
    { id: 'coaching', icon: Users, label: '1-on-1 Coaching' },
    { id: 'assessments', icon: FileText, label: 'Assessments' },
    { id: 'articles', icon: FilePlus, label: 'Articles' },
    { id: 'support', icon: Headphones, label: 'Support' },
    { id: 'involved', icon: UserPlus, label: 'Get Involved' },
    { id: 'upgrade', icon: Crown, label: 'Upgrade Plan' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ];

  const sidebarContent = (
    <>
      <div className="p-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-4 border-[#4C1D95] overflow-hidden mb-3">
          <img 
            src={CURRENT_USER.avatar} 
            alt="User" 
            onError={(e) => {e.target.src = "https://i.pravatar.cc/150?u=fallback"}}
            className="w-full h-full object-cover" 
          />
        </div>
        <h2 className="text-white font-bold text-sm tracking-wide text-center uppercase">{CURRENT_USER.name}</h2>
        <p className="text-gray-400 text-xs mt-1">{CURRENT_USER.role}</p>
      </div>

      <div className="px-6 mb-2">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
               <LayoutGrid size={24} className="text-white" />
               Dashboard
          </div>
      </div>

      <div className="flex-1">
        
    
        <SectionHeader title="SOCIAL" isOpen={socialOpen} toggle={() => setSocialOpen(!socialOpen)} />
        {socialOpen && (
          <div className="mb-4">
            {socialMenuItems.map((item) => (
              <SidebarItem 
                key={item.id}
                icon={item.icon} 
                label={item.label} 
                active={activeTab === item.id} 
                onClick={() => {
                  setActiveTab(item.id);
                  if (mobileOpen) setMobileOpen(false);
                }} 
              />
            ))}
          </div>
        )}

   
        <SectionHeader title="LEARNING" isOpen={learningOpen} toggle={() => setLearningOpen(!learningOpen)} />
        {learningOpen && (
          <div className="mb-8">
            {learningMenuItems.map((item) => (
              <SidebarItem 
                key={item.id}
                icon={item.icon} 
                label={item.label}
                active={activeTab === item.id} 
                onClick={() => {
                    setActiveTab(item.id);
                    if (mobileOpen) setMobileOpen(false);
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#2E0B56] h-screen sticky top-0 overflow-y-auto shrink-0 z-20">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-[#2E0B56] z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         
         <div className="p-4 flex justify-between items-center text-white">
            <span className="font-bold">Menu</span>
            <button onClick={() => setMobileOpen(false)}><X size={24}/></button>
         </div>
         
        {sidebarContent}
      </div>
    </>
  );
}