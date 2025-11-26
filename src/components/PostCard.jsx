import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Heart, MessageSquare, Eye, AlertTriangle, XCircle } from 'lucide-react';

const PostMenu = ({ onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200"
    >
      <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm">
        <Eye size={16} /> View Profile
      </button>
      <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm">
        <AlertTriangle size={16} /> Report
      </button>
      <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm">
        <XCircle size={16} /> Block
      </button>
    </div>
  );
};

export default function PostCard({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
      <div className="flex justify-between items-start mb-4 relative">
        <div className="flex gap-3">
          <img 
            src={post.avatar} 
            alt={post.user} 
            onError={(e) => {e.target.src = "https://i.pravatar.cc/150?u=fallback"}}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
          />
          <div>
            <h3 className="font-bold text-gray-900">{post.user}</h3>
            <p className="text-xs text-gray-500">{post.date} | {post.time}</p>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical size={20} />
          </button>
          {menuOpen && <PostMenu onClose={() => setMenuOpen(false)} />}
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {post.content}
      </p>

      {post.image && (
        <div className="mb-4 rounded-xl overflow-hidden border border-gray-100">
          <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button 
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${liked ? 'bg-red-50 text-red-500' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
          {liked ? parseInt(post.likes) + 1 + "K" : post.likes}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">
          <MessageSquare size={16} />
          {post.comments}
        </button>
      </div>
    </div>
  );
}