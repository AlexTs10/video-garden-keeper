import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const VideoUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: File[]) => {
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length === 0) {
      toast.error('Please upload video files only');
      return;
    }

    setIsUploading(true);

    for (const file of videoFiles) {
      try {
        console.log('Starting upload for:', file.name);
        
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('videos')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        console.log('File uploaded successfully:', uploadData);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(filePath);

        // Insert video metadata into the videos table
        const { error: dbError } = await supabase
          .from('videos')
          .insert({
            title: file.name,
            file_path: filePath,
          });

        if (dbError) {
          console.error('Database error:', dbError);
          toast.error(`Failed to save metadata for ${file.name}`);
          continue;
        }

        toast.success(`Successfully uploaded ${file.name}`);
        console.log('Video metadata saved successfully');

      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error(`Error uploading ${file.name}`);
      }
    }

    setIsUploading(false);
  };

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
    handleUpload(files);
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
        ${isUploading ? 'opacity-50 cursor-wait' : ''}
      `}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Upload className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
        <div className="text-center">
          <p className="text-lg font-medium">
            {isUploading ? 'Uploading...' : 'Drag and drop your videos here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        </div>
        <input
          type="file"
          accept="video/*"
          multiple
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            handleUpload(files);
          }}
        />
      </div>
    </div>
  );
};

export default VideoUpload;