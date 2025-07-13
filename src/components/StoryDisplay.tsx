import React from 'react';
import { Card } from '@/components/ui/card';
import { Scroll, BookOpen, Sparkles } from 'lucide-react';

interface StoryDisplayProps {
  story: string;
  isGenerating: boolean;
}

export function StoryDisplay({ story, isGenerating }: StoryDisplayProps) {
  if (isGenerating) {
    return (
      <Card className="p-8 bg-gradient-warmth border-story-amber/20">
        <div className="text-center">
          <div className="animate-story-float mb-4">
            <Sparkles className="h-12 w-12 mx-auto text-primary animate-story-glow" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Weaving Your Story...
          </h3>
          <p className="text-muted-foreground">
            Our magical AI is crafting a unique tale from your image
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!story) {
    return (
      <Card className="p-8 bg-card/50 border-dashed border-border">
        <div className="text-center text-muted-foreground">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Your generated story will appear here...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-warmth border-story-amber/20 shadow-story">
      <div className="flex items-center mb-4">
        <Scroll className="h-6 w-6 text-primary mr-3" />
        <h3 className="text-xl font-bold text-foreground">Your Story</h3>
      </div>
      <div className="prose prose-amber max-w-none">
        <div className="text-foreground leading-relaxed whitespace-pre-wrap font-medium">
          {story}
        </div>
      </div>
    </Card>
  );
}