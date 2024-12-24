import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const VideoUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length > 0) {
      console.log('Uploading videos:', videoFiles);
      toast.success('Video upload started');
      // Here we would handle the actual upload
    } else {
      toast.error('Please upload video files only');
    }
  }, []);

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative p-8 rounded-lg border-2 border-dashed transition-all duration-300
        ${isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-primary/50'
        }
      `}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Upload className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
        <div className="text-center">
          <p className="text-lg font-medium">Drag and drop your videos here</p>
          <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        </div>
        <input
          type="file"
          accept="video/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length > 0) {
              console.log('Uploading videos:', files);
              toast.success('Video upload started');
              // Here we would handle the actual upload
            }
          }}
        />
      </div>
    </div>
  );
};

export default VideoUpload;