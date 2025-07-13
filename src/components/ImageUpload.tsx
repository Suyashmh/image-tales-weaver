import React, { useState, useRef } from 'react';
import { Upload, Image, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onClearImage: () => void;
}

export function ImageUpload({ onImageUpload, uploadedImage, onClearImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <Card className="p-6 bg-gradient-warmth border-story-amber/20">
      {uploadedImage ? (
        <div className="relative group">
          <img
            src={uploadedImage}
            alt="Uploaded for story generation"
            className="w-full h-64 object-cover rounded-lg shadow-story"
          />
          <Button
            onClick={onClearImage}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none" />
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            isDragging
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <div className="animate-story-float">
            <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Upload Your Image
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop an image here, or click to select
            </p>
            <Button
              variant="magic"
              onClick={() => fileInputRef.current?.click()}
              className="group"
            >
              <Upload className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              Choose Image
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
    </Card>
  );
}