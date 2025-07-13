import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Languages, Globe, Sparkles } from 'lucide-react';

interface TranslateDialogProps {
  onTranslate: (language: string) => void;
  isTranslating: boolean;
}

const languages = [
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'pt', name: 'Portuguese (Português)' },
  { code: 'ru', name: 'Russian (Русский)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'ko', name: 'Korean (한국어)' },
  { code: 'zh', name: 'Chinese (中文)' },
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'fa', name: 'Persian (فارسی)' },
  { code: 'tr', name: 'Turkish (Türkçe)' },
  { code: 'pl', name: 'Polish (Polski)' },
  { code: 'nl', name: 'Dutch (Nederlands)' },
  { code: 'sv', name: 'Swedish (Svenska)' },
  { code: 'da', name: 'Danish (Dansk)' },
  { code: 'no', name: 'Norwegian (Norsk)' },
  { code: 'fi', name: 'Finnish (Suomi)' },
  { code: 'hu', name: 'Hungarian (Magyar)' },
  { code: 'cs', name: 'Czech (Čeština)' },
  { code: 'sk', name: 'Slovak (Slovenčina)' },
  { code: 'ro', name: 'Romanian (Română)' },
  { code: 'bg', name: 'Bulgarian (Български)' },
  { code: 'hr', name: 'Croatian (Hrvatski)' },
  { code: 'sr', name: 'Serbian (Српски)' },
  { code: 'sl', name: 'Slovenian (Slovenščina)' },
  { code: 'et', name: 'Estonian (Eesti)' },
  { code: 'lv', name: 'Latvian (Latviešu)' },
  { code: 'lt', name: 'Lithuanian (Lietuvių)' },
  { code: 'mt', name: 'Maltese (Malti)' },
  { code: 'ga', name: 'Irish (Gaeilge)' },
  { code: 'cy', name: 'Welsh (Cymraeg)' },
  { code: 'eu', name: 'Basque (Euskera)' },
  { code: 'ca', name: 'Catalan (Català)' },
  { code: 'gl', name: 'Galician (Galego)' },
  { code: 'el', name: 'Greek (Ελληνικά)' },
  { code: 'he', name: 'Hebrew (עברית)' },
  { code: 'th', name: 'Thai (ไทย)' },
  { code: 'vi', name: 'Vietnamese (Tiếng Việt)' },
  { code: 'id', name: 'Indonesian (Bahasa Indonesia)' },
  { code: 'ms', name: 'Malay (Bahasa Melayu)' },
  { code: 'tl', name: 'Filipino (Tagalog)' },
  { code: 'sw', name: 'Swahili (Kiswahili)' },
  { code: 'am', name: 'Amharic (አማርኛ)' },
  { code: 'zu', name: 'Zulu (isiZulu)' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'is', name: 'Icelandic (Íslenska)' },
  { code: 'mk', name: 'Macedonian (Македонски)' },
  { code: 'sq', name: 'Albanian (Shqip)' },
];

export function TranslateDialog({ onTranslate, isTranslating }: TranslateDialogProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [open, setOpen] = useState(false);

  const handleTranslate = () => {
    if (selectedLanguage) {
      const language = languages.find(lang => lang.code === selectedLanguage);
      onTranslate(language?.name || selectedLanguage);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="glow" className="group">
          <Languages className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
          Translate
          <Globe className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-warmth border-story-amber/30">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Globe className="h-5 w-5 mr-2 text-primary animate-story-glow" />
            Translate Your Story
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="language" className="text-base font-semibold">
              Choose Language
            </Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="mt-2 bg-background/50 border-story-amber/30 focus:border-primary">
                <SelectValue placeholder="Select a language..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-background border-story-amber/30">
                {languages.map((language) => (
                  <SelectItem
                    key={language.code}
                    value={language.code}
                    className="hover:bg-story-glow cursor-pointer"
                  >
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleTranslate}
            variant="magic"
            className="w-full"
            disabled={!selectedLanguage || isTranslating}
          >
            {isTranslating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Translating...
              </>
            ) : (
              <>
                <Languages className="h-4 w-4 mr-2" />
                Translate Story
                <Sparkles className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}