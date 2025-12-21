"use client";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Calendar, MapPin, Users, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/cms/forms';
import { useEventTypes } from '@/hooks/cms/use-portfolio';
import { createPortfolioSchema, type CreatePortfolioInput } from '@/lib/schemas/portfolio.schema';
import { cn } from '@/lib/utils';

interface PortfolioFormProps {
  initialData?: Partial<CreatePortfolioInput>;
  onSubmit: (data: CreatePortfolioInput) => void;
  isSubmitting: boolean;
  isEdit?: boolean;
}

export function PortfolioForm({ initialData, onSubmit, isSubmitting, isEdit }: PortfolioFormProps) {
  const { data: eventTypes } = useEventTypes();
  
  const form = useForm<CreatePortfolioInput>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      event_type_id: initialData?.event_type_id || '',
      venue: initialData?.venue || '',
      event_date: initialData?.event_date || '',
      thumbnail_url: initialData?.thumbnail_url || '',
      gallery: initialData?.gallery || [],
      description: initialData?.description || '',
      goals: initialData?.goals || '',
      technical_highlights: initialData?.technical_highlights || [],
      attendee_count: initialData?.attendee_count || undefined,
      client_quote_text: initialData?.client_quote_text || '',
      client_quote_author: initialData?.client_quote_author || '',
      client_quote_role: initialData?.client_quote_role || '',
      is_featured: initialData?.is_featured ?? false,
      is_active: initialData?.is_active ?? true,
      display_order: initialData?.display_order ?? 0,
      seo_title: initialData?.seo_title || '',
      seo_description: initialData?.seo_description || '',
    },
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control: form.control,
    name: 'gallery',
  });

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    control: form.control,
    name: 'technical_highlights',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-6xl space-y-8">
        {/* Section: Basic Information */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="project-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (lowercase with hyphens)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the project" className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section: Event Details */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Event Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="event_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypes?.data?.map((eventType) => (
                        <SelectItem key={eventType.id} value={eventType.id}>
                          {eventType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Event venue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendee_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendee Count</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Number of attendees" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section: Media */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Media</h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="thumbnail_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value || null}
                      onChange={(url) => field.onChange(url || '')}
                      folder="portfolio/thumbnails"
                      aspectRatio="video"
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended aspect ratio: 16:9
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Gallery Images</FormLabel>
              <FormDescription className="mb-4 block">
                Add multiple images to showcase the project
              </FormDescription>
              <div className="space-y-4">
                {galleryFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <ImageUpload
                        value={form.watch(`gallery.${index}`) || null}
                        onChange={(url) => form.setValue(`gallery.${index}`, url || '')}
                        folder="portfolio/gallery"
                        aspectRatio="video"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeGallery(index)}
                      className="mt-6"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendGallery('')}
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Content */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Content</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goals</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What were the goals of this project?" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Technical Highlights</FormLabel>
              <FormDescription className="mb-4 block">
                List key technical aspects of the project
              </FormDescription>
              <div className="space-y-4">
                {highlightFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`technical_highlights.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Technical highlight" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendHighlight('')}
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Highlight
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Client Testimonial */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Client Testimonial
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="client_quote_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Client testimonial" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="client_quote_author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client_quote_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Role/Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Client role or company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Section: Settings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="display_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormDescription>
                    Lower numbers appear first
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                    <FormDescription>
                      Show in featured sections
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Visible on the public site
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section: SEO */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">SEO</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="seo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use the project title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seo_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="SEO description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use a truncated description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <span className="mr-2 h-4 w-4 animate-spin">⟳</span>}
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}