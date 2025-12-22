'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/cms/shared/page-header';
import { RentalCategoriesTab } from '@/components/cms/modules/categories/rental-categories-tab';
import { BlogCategoriesTab } from '@/components/cms/modules/categories/blog-categories-tab';
import { FaqCategoriesTab } from '@/components/cms/modules/categories/faq-categories-tab';

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage categories for rentals, blog posts, and FAQs"
        breadcrumbs={[{ label: 'Categories' }]}
      />
      
      <Tabs defaultValue="rentals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        <TabsContent value="rentals" className="mt-6">
          <RentalCategoriesTab />
        </TabsContent>
        <TabsContent value="blog" className="mt-6">
          <BlogCategoriesTab />
        </TabsContent>
        <TabsContent value="faqs" className="mt-6">
          <FaqCategoriesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}