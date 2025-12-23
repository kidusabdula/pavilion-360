// components/blog/blog-client-view.tsx
'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, X, ArrowRight, Calendar } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/utils/blog-adapter';

interface BlogClientViewProps {
  initialPosts: BlogPost[];
  categories: Array<{ id: string; name: string; slug: string }>;
}

export function BlogClientView({
  initialPosts,
  categories,
}: BlogClientViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (activeCategory !== 'All' && post.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [initialPosts, searchQuery, activeCategory]);

  const hasFilters = searchQuery || activeCategory !== 'All';
  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  const categoryOptions = ['All', ...categories.map((c) => c.name)];

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-11 h-12 text-base rounded-xl border-border/50 focus:border-accent transition-all bg-card"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryOptions.map((category) => {
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/25'
                  : 'border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {category === 'All' ? 'All Posts' : category}
            </motion.button>
          );
        })}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30 max-w-4xl mx-auto">
        <span className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-semibold text-foreground">
            {filteredPosts.length}
          </span>{' '}
          {filteredPosts.length === 1 ? 'article' : 'articles'}
        </span>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-accent h-7"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Blog Posts Grid */}
      <AnimatePresence mode="wait">
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 px-4"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search or filter.
            </p>
            <Button onClick={clearFilters} variant="outline" className="rounded-xl">
              Clear filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-xl border border-border/50 bg-linear-to-b from-card to-card/80 overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-sm shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mb-3 text-lg font-bold group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                      <span>Read article</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="h-0.5 bg-linear-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent transition-all duration-500" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Articles count */}
      {filteredPosts.length > 0 && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          Showing {filteredPosts.length} of {initialPosts.length} articles
        </div>
      )}
    </>
  );
}