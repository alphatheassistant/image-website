import { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  //Search,
  Download,
  Share2,
  Copy,
  Check,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Wand2,
  Sparkles,
  SlidersHorizontal,
  Bot,
} from 'lucide-react';

import images from './images.json';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleCopy}
      className="transition-all duration-200"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
}

function ImageCard({ image, onClick }) {
  return (
    <Card className="group overflow-hidden">
      <div onClick={onClick} className="relative aspect-square cursor-pointer">
        <img
          src={image.url}
          alt={image.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-medium text-lg text-white mb-1">
              {image.title.length > 28
                ? `${image.title.substring(0, 28)}..`
                : image.title}
            </h3>
            <p className="text-sm text-white/80 mb-2">
              {image.prompt.length > 38
                ? `${image.prompt.substring(0, 37.5)}..`
                : image.prompt}
            </p>
            <div className="flex items-center justify-between text-white/80">
              <div className="flex items-center gap-1 text-sm">
                <Bot className="w-3 h-3" />
                <span>{image.model}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" /> {image.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> {image.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ImageDialog({ image, open, onOpenChange }) {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 gap-0 sm:max-h-[96vh] max-h-screen">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-[88.3vh] h-auto">
          {/* Image Card */}
          <Card className="rounded-3xl lg:h-full h-[33vh] lg:rounded-r-none">
            <div className="rounded-3xl relative h-full bg-white flex items-center justify-center">
              <img
                src={image.url}
                alt={image.title}
                className="rounded-l h-full w-full object-contain"
                style={{ borderRadius: '.75rem 0 0 .75rem' }}
              />
            </div>
          </Card>

          {/* Info Card */}
          <Card className="lg:h-full h-auto lg:rounded-l-none lg:border-l-0">
            <ScrollArea className="h-full max-h-[40vh] lg:max-h-full">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{image.title}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Bot className="w-4 h-4" />
                      <span className="font-medium">{image.model}</span>
                    </div>
                    <div className="text-sm text-neutral-400">
                      by {image.creator}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Prompt
                  </h3>
                  <Card className="relative bg-neutral-50">
                    <p className="text-sm text-neutral-600 p-4 pr-12">
                      {image.prompt}
                    </p>
                    <div className="absolute right-2 top-2">
                      <CopyButton text={image.prompt} />
                    </div>
                  </Card>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {image.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {image.comments}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="default">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              <h1 className="text-2xl font-bold">AIGallery</h1>
            </div>
            <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
              <div className="focus:outline-none relative flex-1 sm:w-96"></div>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                iamsatyanchal
              </Button>
              <Button
                className="gap-2 whitespace-nowrap"
                onClick={() => window.open('https://pizzart.me', '_blank')}
              >
                <Sparkles className="w-4 h-4" />
                Generate @ pizzart.me
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </main>

      <ImageDialog
        image={selectedImage}
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      />
    </div>
  );
}

export default App;
