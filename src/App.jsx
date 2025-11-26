import React, { useState } from 'react';
import { Search, Image as ImageIcon, Video, Smile, Paperclip } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PostCard from './components/PostCard';
import RightPanel from './components/RightPanel';
import { CURRENT_USER, POSTS } from './data/mockData';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('news');
  const [posts, setPosts] = useState(POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handlePostSubmit = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      user: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      date: "Just now",
      time: "",
      content: newPostText,
      likes: "0",
      comments: "0",
      image: null
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans flex text-gray-800">
      
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        setMobileOpen={setMobileMenuOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            
            {/* --- MOVED BANNER HERE (Outside the Grid) --- */}
            {/* Now it will span the full width above the columns */}
            <div className="bg-gradient-to-r from-[#2E0B56] to-[#4C1D95] rounded-2xl p-8 mb-6 text-center text-white relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
              <h1 className="text-3xl font-bold relative z-10 text-[#D4F233]">
                {activeTab === 'news' ? 'News Feed' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-white/80 mt-2 relative z-10">Connect with like-minded people</p>
            </div>

            {/* Grid for Feed and Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Center Feed Area (Takes 8 columns) */}
              <div className="lg:col-span-8 xl:col-span-8">
                
                {/* Create Post Widget */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                  <div className="flex gap-4 mb-4">
                    <img src={CURRENT_USER.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                       <input 
                         type="text"
                         value={newPostText}
                         onChange={(e) => setNewPostText(e.target.value)}
                         placeholder={`Share what's on your mind, ${CURRENT_USER.name.split(' ')[0]}...`}
                         className="w-full text-gray-600 text-sm py-2 focus:outline-none placeholder:text-gray-400"
                       />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex gap-4 text-gray-400">
                      <button className="hover:text-[#4C1D95]"><ImageIcon size={20} /></button>
                      <button className="hover:text-[#4C1D95]"><Video size={20} /></button>
                      <button className="hover:text-[#4C1D95]"><Paperclip size={20} /></button>
                      <button className="hover:text-[#4C1D95]"><Smile size={20} /></button>
                    </div>
                    <button 
                      onClick={handlePostSubmit}
                      disabled={!newPostText.trim()}
                      className={`${newPostText.trim() ? 'bg-[#7B2CBF] hover:bg-[#6a25a4]' : 'bg-gray-300 cursor-not-allowed'} text-white px-6 py-1.5 rounded-lg text-sm font-medium transition`}
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 relative">
                      <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search Posts or Users..." 
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7B2CBF]"
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Feed Posts */}
                <div>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-10">
                      No posts found matching "{searchQuery}"
                    </div>
                  )}
                </div>

              </div>

              {/* Right Panel (Takes 4 columns) */}
              <RightPanel />

              {/* Footer */}
              <div className="lg:col-span-8 text-center text-gray-400 text-sm pb-8 pt-4">
                  © 2025, made by <span className="font-bold text-gray-600">ILMF</span> for a better web.
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}