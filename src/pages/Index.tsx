import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { StoryDisplay } from '@/components/StoryDisplay';
import { CustomizeDialog } from '@/components/CustomizeDialog';

import { toast } from '@/hooks/use-toast';
import { Wand2, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import heroImage from '@/assets/hero-stories.jpg';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [story, setStory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setStory(''); // Clear previous story
    };
    reader.readAsDataURL(file);
    toast({
      title: "Image uploaded successfully!",
      description: "Ready to generate your story",
    });
  };

  const clearImage = () => {
    setUploadedImage(null);
    setStory('');
  };

  const generateStory = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI story generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleStory = `In a realm where golden sunlight danced through ancient trees, a mysterious figure emerged from the shadows. The image before them told a tale of adventure and wonder, where every detail held the promise of an extraordinary journey.

The warm orange glow cast magical shadows that seemed to whisper secrets of forgotten times. As the protagonist stepped forward, they discovered that this moment would change everything they thought they knew about their world.

What started as an ordinary day had transformed into the beginning of an epic adventure, filled with mystery, courage, and the kind of magic that only exists when one truly believes in the power of stories.`;
      
      setStory(sampleStory);
      toast({
        title: "Story generated!",
        description: "Your magical tale is ready",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomize = async (prompt: string, style: string, length: string) => {
    setIsCustomizing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const customizedStory = `[${style} - ${length}] ${prompt ? `Following your guidance: "${prompt}" - ` : ''}In this reimagined tale, the story takes on new dimensions of creativity and wonder. The narrative flows with the essence of ${style.toLowerCase()}, weaving together elements that speak to the heart of what makes stories truly magical.

Each word is carefully chosen to match your vision, creating a personalized journey that reflects both the original image and your unique creative direction. The tale unfolds with the perfect balance of intrigue and emotion, crafted specifically to your preferences.

This is your story, born from your image and shaped by your imagination.`;
      
      setStory(customizedStory);
      toast({
        title: "Story customized!",
        description: "Your personalized tale is ready",
      });
    } catch (error) {
      toast({
        title: "Customization failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsCustomizing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-warmth">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-story-float">
              <span className="bg-gradient-story bg-clip-text text-transparent">
                Image Tales Weaver
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your images into magical stories with the power of AI. 
              Upload, generate, customize, and translate - let your creativity flow!
            </p>
            <div className="flex justify-center mt-6">
              <Sparkles className="h-8 w-8 text-primary animate-story-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Image Upload */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-story-amber/20">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Step 1: Upload Your Image</h2>
              </div>
              <ImageUpload
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                onClearImage={clearImage}
              />
            </Card>

            {/* Action Buttons */}
            {uploadedImage && (
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-story-amber/20">
                <div className="flex items-center mb-4">
                  <Wand2 className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Step 2: Create Your Story</h2>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={generateStory}
                    variant="story"
                    size="lg"
                    className="w-full text-lg"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                        Generating Story...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-3" />
                        Generate Story
                        <Wand2 className="h-5 w-5 ml-3" />
                      </>
                    )}
                  </Button>

                  {story && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <CustomizeDialog
                        onCustomize={handleCustomize}
                        isCustomizing={isCustomizing}
                      />
                      <Button
                        onClick={generateStory}
                        variant="warm"
                        className="flex-1"
                        disabled={isGenerating}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Story Display */}
          <div>
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-story-amber/20 mb-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Your Generated Story</h2>
              </div>
            </Card>
            <StoryDisplay story={story} isGenerating={isGenerating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
