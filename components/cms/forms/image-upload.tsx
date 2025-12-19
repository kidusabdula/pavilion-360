// components/cms/forms/image-upload.tsx
// Image upload component with file explorer and URL input
"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Link as LinkIcon,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
  aspectRatio?: "video" | "square" | "portrait";
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  label = "Image",
  aspectRatio = "video",
  disabled = false,
}: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB");
        return;
      }

      setIsUploading(true);

      try {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to Supabase Storage
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/cms/media/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || "Upload failed");
        }

        const result = await response.json();
        onChange(result.data.url);
        setIsOpen(false);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to upload image"
        );
        setPreviewUrl(null);
      } finally {
        setIsUploading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [folder, onChange]
  );

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    onChange(urlInput.trim());
    setIsOpen(false);
    setUrlInput("");
    toast.success("Image URL set successfully");
  };

  const handleRemove = () => {
    onChange(null);
    setPreviewUrl(null);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      {value ? (
        // Image preview with remove option
        <div
          className={cn(
            "group relative overflow-hidden rounded-xl border border-border bg-muted",
            aspectClasses[aspectRatio]
          )}
        >
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {!disabled && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Replace
                  </Button>
                </DialogTrigger>
                <ImageUploadDialog
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  urlInput={urlInput}
                  setUrlInput={setUrlInput}
                  handleUrlSubmit={handleUrlSubmit}
                  triggerFileSelect={triggerFileSelect}
                  isUploading={isUploading}
                  previewUrl={previewUrl}
                />
              </Dialog>
              <Button variant="destructive" size="sm" onClick={handleRemove}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Empty state with upload trigger
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                "flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 transition-colors hover:border-accent hover:bg-muted/50",
                aspectClasses[aspectRatio],
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Click to upload
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, WEBP up to 10MB
              </span>
            </button>
          </DialogTrigger>
          <ImageUploadDialog
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            handleUrlSubmit={handleUrlSubmit}
            triggerFileSelect={triggerFileSelect}
            isUploading={isUploading}
            previewUrl={previewUrl}
          />
        </Dialog>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="sr-only"
        disabled={disabled || isUploading}
      />
    </div>
  );
}

// Separate dialog content component
function ImageUploadDialog({
  activeTab,
  setActiveTab,
  urlInput,
  setUrlInput,
  handleUrlSubmit,
  triggerFileSelect,
  isUploading,
  previewUrl,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  urlInput: string;
  setUrlInput: (url: string) => void;
  handleUrlSubmit: () => void;
  triggerFileSelect: () => void;
  isUploading: boolean;
  previewUrl: string | null;
}) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Image</DialogTitle>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {isUploading ? (
            <div className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              {previewUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={previewUrl}
                    alt="Upload preview"
                    fill
                    className="rounded-lg object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                </div>
              ) : (
                <>
                  <Loader2 className="mb-2 h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Uploading...
                  </span>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={triggerFileSelect}
              className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 transition-colors hover:border-accent hover:bg-muted/50"
            >
              <ImageIcon className="mb-3 h-12 w-12 text-muted-foreground" />
              <span className="text-sm font-medium">
                Click to select from your computer
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, WEBP up to 10MB
              </span>
            </button>
          )}
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUrlSubmit();
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Enter a direct URL to an image file
            </p>
          </div>
          <Button onClick={handleUrlSubmit} className="w-full">
            Use this URL
          </Button>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
