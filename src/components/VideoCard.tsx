import React from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  onClick: () => void;
}

const VideoCard = ({ title, thumbnail, duration, onClick }: VideoCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border border-gray-200/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer animate-fade-up"
    >
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{title}</h3>
      </div>
    </div>
  );
};

export default VideoCard;