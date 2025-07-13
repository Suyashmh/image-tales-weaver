import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Wand2, Sparkles } from 'lucide-react';

interface CustomizeDialogProps {
  onCustomize: (prompt: string, style: string, length: string) => void;
  isCustomizing: boolean;
}

const storyStyles = [
  'Fantasy Adventure',
  'Romantic Tale',
  'Mystery Thriller',
  'Sci-Fi Epic',
  'Horror Story',
  'Comedy',
  'Historical Fiction',
  'Children\'s Story',
];

const storyLengths = [
  'Short (1-2 paragraphs)',
  'Medium (3-4 paragraphs)',
  'Long (5+ paragraphs)',
];

export function CustomizeDialog({ onCustomize, isCustomizing }: CustomizeDialogProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Fantasy Adventure');
  const [selectedLength, setSelectedLength] = useState('Medium (3-4 paragraphs)');
  const [open, setOpen] = useState(false);

  const handleCustomize = () => {
    onCustomize(customPrompt, selectedStyle, selectedLength);
    setOpen(false);
    setCustomPrompt('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="warm" className="group">
          <Settings className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Customize Story
          <Wand2 className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-warmth border-story-amber/30">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Customize Your Story
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="style" className="text-base font-semibold">
              Story Style
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {storyStyles.map((style) => (
                <Badge
                  key={style}
                  variant={selectedStyle === style ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedStyle === style
                      ? 'bg-primary text-primary-foreground shadow-warm'
                      : 'hover:bg-story-glow'
                  }`}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="length" className="text-base font-semibold">
              Story Length
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {storyLengths.map((length) => (
                <Badge
                  key={length}
                  variant={selectedLength === length ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedLength === length
                      ? 'bg-primary text-primary-foreground shadow-warm'
                      : 'hover:bg-story-glow'
                  }`}
                  onClick={() => setSelectedLength(length)}
                >
                  {length}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="prompt" className="text-base font-semibold">
              Additional Instructions
            </Label>
            <Textarea
              id="prompt"
              placeholder="Add specific themes, characters, or plot elements you'd like to include..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="mt-2 min-h-[100px] bg-background/50 border-story-amber/30 focus:border-primary"
            />
          </div>

          <Button
            onClick={handleCustomize}
            variant="magic"
            className="w-full"
            disabled={isCustomizing}
          >
            {isCustomizing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Customizing...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Apply Customization
                <Sparkles className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}