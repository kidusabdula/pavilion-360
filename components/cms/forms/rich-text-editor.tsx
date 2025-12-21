'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface RichTextEditorProps {
  value: any; // TipTap JSON
  onChange: (value: any) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });
  
  if (!editor) return null;
  
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/30 p-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive('bold') && 'bg-accent')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive('italic') && 'bg-accent')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(editor.isActive('heading', { level: 1 }) && 'bg-accent')}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive('heading', { level: 2 }) && 'bg-accent')}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive('bulletList') && 'bg-accent')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive('orderedList') && 'bg-accent')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={cn(editor.isActive('link') && 'bg-accent')}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="prose prose-sm dark:prose-invert max-w-none p-4 min-h-[300px] focus:outline-none" 
      />
    </div>
  );
}