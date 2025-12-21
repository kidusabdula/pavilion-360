// app/(cms)/cms/blog/page.tsx
// CMS Blog list page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable, TableThumbnail } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useBlogPosts, useDeleteBlogPost, useBlogCategories } from '@/hooks/cms/use-blog';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type BlogPost = Tables<'blog_posts'>;
type BlogPostWithCategory = BlogPost & {
  blog_categories: Tables<'blog_categories'> | null;
};

export default function BlogPage() {
  const [deleteTarget, setDeleteTarget] = useState<BlogPostWithCategory | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const { data, isLoading, error } = useBlogPosts({ category: categoryFilter });
  const { data: categoriesData } = useBlogCategories();
  const deleteMutation = useDeleteBlogPost();
  
  const posts = (data?.data || []) as BlogPostWithCategory[];
  const categories = categoriesData?.data || [];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Blog post deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete blog post');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Blog"
          description="Manage your blog posts"
          breadcrumbs={[{ label: 'Blog' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Blog"
          description="Manage your blog posts"
          breadcrumbs={[{ label: 'Blog' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load blog posts: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog"
        description="Manage your blog posts"
        breadcrumbs={[{ label: 'Blog' }]}
        actions={
          <Button asChild>
            <Link href="/cms/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Link>
          </Button>
        }
      />
      
      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {categoryFilter !== 'all' && (
          <Button variant="ghost" size="sm" onClick={() => setCategoryFilter('all')}>
            Clear filter
          </Button>
        )}
      </div>
      
      {posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No blog posts yet"
          description="Get started by writing your first post."
          action={{ label: 'Add Post', href: '/cms/blog/new' }}
        />
      ) : (
        <DataTable
          data={posts}
          baseUrl="/cms/blog"
          searchPlaceholder="Search posts..."
          searchKey="title"
          showViewButton
          viewUrl={(post) => `/blog/${post.slug}`}
          onDelete={(post) => setDeleteTarget(post)}
          columns={[
            {
              key: 'thumbnail',
              label: '',
              className: 'w-16',
              render: (post) => (
                <TableThumbnail
                  src={post.thumbnail_url}
                  alt={post.title}
                  fallback={post.title.charAt(0)}
                />
              ),
            },
            {
              key: 'title',
              label: 'Title',
              render: (post) => (
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.slug}</p>
                </div>
              ),
            },
            {
              key: 'category',
              label: 'Category',
              className: 'hidden md:table-cell',
              render: (post) => (
                <span className="text-muted-foreground">
                  {post.blog_categories?.name || '—'}
                </span>
              ),
            },
            {
              key: 'author',
              label: 'Author',
              className: 'hidden lg:table-cell',
              render: (post) => (
                <span className="text-muted-foreground">
                  {post.author_name || '—'}
                </span>
              ),
            },
            {
              key: 'is_published',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (post) => (
                <StatusBadge
                  status={post.is_published ? 'active' : 'draft'}
                />
              ),
            },
            {
              key: 'is_featured',
              label: 'Featured',
              className: 'hidden lg:table-cell',
              render: (post) => (
                <StatusBadge
                  status={post.is_featured ? 'featured' : 'draft'}
                />
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Post?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}