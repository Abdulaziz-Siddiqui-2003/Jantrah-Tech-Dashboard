import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Send, Bell } from 'lucide-react';
import { LANGUAGES, MESSAGES, NOTIFICATIONS } from '../data/mockData';

export default function Header({ onMenuClick }) {
  const [langOpen, setLangOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const langRef = useRef(null);
  const msgRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
      if (msgRef.current && !msgRef.current.contains(event.target)) setMsgOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-30 relative">
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="lg:hidden text-gray-600" onClick={onMenuClick}>
            <Menu size={24} />
        </button>
        

        <div className="flex items-center gap-2 lg:gap-3">
          <a href=""><img src="/logo.png" alt="" /></a>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">

        <div className="relative" ref={langRef}>
            <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 lg:gap-2 px-3 py-1.5 lg:px-4 bg-purple-100 text-[#4C1D95] rounded-full text-xs lg:text-sm font-medium hover:bg-purple-200 transition"
            >
                {currentLang} <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
                <div className="absolute right-0 top-12 w-32 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {LANGUAGES.map(lang => (
                        <button 
                            key={lang}
                            onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-[#4C1D95]"
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            )}
        </div>


        <div className="relative" ref={msgRef}>
            <button 
                onClick={() => setMsgOpen(!msgOpen)}
                className={`p-2 rounded-full transition ${msgOpen ? 'bg-purple-100 text-[#4C1D95]' : 'text-[#4C1D95] hover:bg-purple-50'}`}
            >
                <Send size={20} />
            </button>

            {msgOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-3 border-b border-gray-100 font-semibold text-gray-700 flex justify-between">
                        Messages <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{MESSAGES.length} New</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {MESSAGES.map(msg => (
                            <div key={msg.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-sm text-gray-800">{msg.user}</span>
                                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 text-center border-t border-gray-100">
                        <button className="text-xs text-[#4C1D95] font-semibold hover:underline">View All</button>
                    </div>
                </div>
            )}
        </div>

        <div className="relative" ref={notifRef}>
            <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className={`p-2 rounded-full relative transition ${notifOpen ? 'bg-purple-100 text-[#4C1D95]' : 'text-[#4C1D95] hover:bg-purple-50'}`}
            >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {notifOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-3 border-b border-gray-100 font-semibold text-gray-700">
                        Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {NOTIFICATIONS.map(notif => (
                            <div key={notif.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex gap-3">
                                <div className="w-2 h-2 mt-1.5 bg-[#D4F233] rounded-full shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-600 leading-tight">{notif.text}</p>
                                    <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 text-center border-t border-gray-100">
                        <button className="text-xs text-[#4C1D95] font-semibold hover:underline">Mark all as read</button>
                    </div>
                </div>
            )}
        </div>

      </div>
    </header>
  );
}