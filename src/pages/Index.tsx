import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import VideoUpload from '../components/VideoUpload';
import { Search, Plus, X } from 'lucide-react';

const Index = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder data - in a real app this would come from your backend
  const videos = [
    {
      id: 1,
      title: "Introduction to Video Library",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
      duration: "2:30"
    },
    {
      id: 2,
      title: "How to Upload Videos",
      thumbnail: "https://images.unsplash.com/photo-1496559249665-c7e2874707ea",
      duration: "3:45"
    },
    // Add more placeholder videos as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Video Library</h1>
              <p className="text-gray-500 mt-2">Organize and manage your videos</p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Upload Video
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Upload Modal */}
          {isUploadOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Upload Video</h2>
                  <button
                    onClick={() => setIsUploadOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <VideoUpload />
              </div>
            </div>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos
              .filter(video => 
                video.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(video => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  onClick={() => console.log('Video clicked:', video.id)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;