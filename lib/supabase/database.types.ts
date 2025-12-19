export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          blog_post_id: string
          tag_id: string
        }
        Insert: {
          blog_post_id: string
          tag_id: string
        }
        Update: {
          blog_post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string | null
          category_id: string | null
          content: Json
          created_at: string | null
          deleted_at: string | null
          excerpt: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          published_at: string | null
          read_time_minutes: number | null
          seo_description: string | null
          seo_image_url: string | null
          seo_title: string | null
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          content?: Json
          created_at?: string | null
          deleted_at?: string | null
          excerpt?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          read_time_minutes?: number | null
          seo_description?: string | null
          seo_image_url?: string | null
          seo_title?: string | null
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          content?: Json
          created_at?: string | null
          deleted_at?: string | null
          excerpt?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          read_time_minutes?: number | null
          seo_description?: string | null
          seo_image_url?: string | null
          seo_title?: string | null
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      faq_categories: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category_id: string
          created_at: string | null
          deleted_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          category_id: string
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category_id?: string
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "faq_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["inquiry_status"] | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          filename: string
          folder: string | null
          id: string
          mime_type: string | null
          original_name: string
          size_bytes: number | null
          storage_path: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          filename: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          original_name: string
          size_bytes?: number | null
          storage_path: string
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          filename?: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          original_name?: string
          size_bytes?: number | null
          storage_path?: string
          url?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: string
          page_id: string
          page_type: string
          view_count: number | null
          view_date: string
        }
        Insert: {
          id?: string
          page_id: string
          page_type: string
          view_count?: number | null
          view_date?: string
        }
        Update: {
          id?: string
          page_id?: string
          page_type?: string
          view_count?: number | null
          view_date?: string
        }
        Relationships: []
      }
      portfolio_project_services: {
        Row: {
          portfolio_project_id: string
          service_id: string
        }
        Insert: {
          portfolio_project_id: string
          service_id: string
        }
        Update: {
          portfolio_project_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_project_services_portfolio_project_id_fkey"
            columns: ["portfolio_project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_project_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_project_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "v_services_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          attendee_count: number | null
          client_quote_author: string | null
          client_quote_role: string | null
          client_quote_text: string | null
          created_at: string | null
          deleted_at: string | null
          description: string
          display_order: number | null
          event_date: string | null
          event_type_id: string | null
          gallery: string[] | null
          goals: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          technical_highlights: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          venue: string | null
          view_count: number | null
        }
        Insert: {
          attendee_count?: number | null
          client_quote_author?: string | null
          client_quote_role?: string | null
          client_quote_text?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description: string
          display_order?: number | null
          event_date?: string | null
          event_type_id?: string | null
          gallery?: string[] | null
          goals?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          technical_highlights?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          venue?: string | null
          view_count?: number | null
        }
        Update: {
          attendee_count?: number | null
          client_quote_author?: string | null
          client_quote_role?: string | null
          client_quote_text?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string
          display_order?: number | null
          event_date?: string | null
          event_type_id?: string | null
          gallery?: string[] | null
          goals?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          technical_highlights?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          venue?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string | null
          email: string
          event_date: string | null
          event_location: string | null
          event_type_id: string | null
          guest_count: number | null
          id: string
          items: Json
          message: string | null
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["quote_status"] | null
          total_estimate: number | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          event_date?: string | null
          event_location?: string | null
          event_type_id?: string | null
          guest_count?: number | null
          id?: string
          items?: Json
          message?: string | null
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          total_estimate?: number | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          event_date?: string | null
          event_location?: string | null
          event_type_id?: string | null
          guest_count?: number | null
          id?: string
          items?: Json
          message?: string | null
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          total_estimate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
        ]
      }
      related_services: {
        Row: {
          related_service_id: string
          service_id: string
        }
        Insert: {
          related_service_id: string
          service_id: string
        }
        Update: {
          related_service_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "related_services_related_service_id_fkey"
            columns: ["related_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_services_related_service_id_fkey"
            columns: ["related_service_id"]
            isOneToOne: false
            referencedRelation: "v_services_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "v_services_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rental_item_event_types: {
        Row: {
          event_type_id: string
          rental_item_id: string
        }
        Insert: {
          event_type_id: string
          rental_item_id: string
        }
        Update: {
          event_type_id?: string
          rental_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_item_event_types_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_item_event_types_rental_item_id_fkey"
            columns: ["rental_item_id"]
            isOneToOne: false
            referencedRelation: "rental_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_item_event_types_rental_item_id_fkey"
            columns: ["rental_item_id"]
            isOneToOne: false
            referencedRelation: "v_rental_items_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_item_tags: {
        Row: {
          rental_item_id: string
          tag_id: string
        }
        Insert: {
          rental_item_id: string
          tag_id: string
        }
        Update: {
          rental_item_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_item_tags_rental_item_id_fkey"
            columns: ["rental_item_id"]
            isOneToOne: false
            referencedRelation: "rental_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_item_tags_rental_item_id_fkey"
            columns: ["rental_item_id"]
            isOneToOne: false
            referencedRelation: "v_rental_items_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_item_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_items: {
        Row: {
          category_id: string
          created_at: string | null
          deleted_at: string | null
          details: string | null
          display_order: number | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          sku: string | null
          slug: string
          specs: Json | null
          subcategory: string | null
          thumbnail_url: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          deleted_at?: string | null
          details?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          sku?: string | null
          slug: string
          specs?: Json | null
          subcategory?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          deleted_at?: string | null
          details?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          specs?: Json | null
          subcategory?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "rental_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      service_packages: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          features: string[] | null
          id: string
          name: string
          service_id: string
          starting_price: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: string[] | null
          id?: string
          name: string
          service_id: string
          starting_price?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: string[] | null
          id?: string
          name?: string
          service_id?: string
          starting_price?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_packages_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_packages_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "v_services_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      service_process_steps: {
        Row: {
          created_at: string | null
          description: string
          id: string
          service_id: string
          step_number: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          service_id: string
          step_number: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          service_id?: string
          step_number?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_process_steps_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_process_steps_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "v_services_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      service_use_cases: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          id: string
          image_url: string | null
          service_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          service_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          service_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_use_cases_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_use_cases_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "v_services_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string
          display_order: number | null
          gallery: string[] | null
          icon: string
          id: string
          is_active: boolean | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          tagline: string | null
          thumbnail_url: string | null
          updated_at: string | null
          view_count: number | null
          what_we_do: string[] | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description: string
          display_order?: number | null
          gallery?: string[] | null
          icon?: string
          id?: string
          is_active?: boolean | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tagline?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          view_count?: number | null
          what_we_do?: string[] | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string
          display_order?: number | null
          gallery?: string[] | null
          icon?: string
          id?: string
          is_active?: boolean | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tagline?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          view_count?: number | null
          what_we_do?: string[] | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          deleted_at: string | null
          display_order: number | null
          email: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          role: string
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_image_url: string | null
          author_name: string
          author_role: string | null
          company: string | null
          created_at: string | null
          deleted_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          portfolio_project_id: string | null
          quote: string
          updated_at: string | null
        }
        Insert: {
          author_image_url?: string | null
          author_name: string
          author_role?: string | null
          company?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          portfolio_project_id?: string | null
          quote: string
          updated_at?: string | null
        }
        Update: {
          author_image_url?: string | null
          author_name?: string
          author_role?: string | null
          company?: string | null
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          portfolio_project_id?: string | null
          quote?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_portfolio_project_id_fkey"
            columns: ["portfolio_project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_event_types: {
        Row: {
          event_type_id: string
          venue_id: string
        }
        Insert: {
          event_type_id: string
          venue_id: string
        }
        Update: {
          event_type_id?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_event_types_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_event_types_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          capacity_max: number | null
          capacity_min: number | null
          city: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          display_order: number | null
          external_link: string | null
          id: string
          is_active: boolean | null
          is_managed: boolean | null
          location: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          capacity_max?: number | null
          capacity_min?: number | null
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          display_order?: number | null
          external_link?: string | null
          id?: string
          is_active?: boolean | null
          is_managed?: boolean | null
          location?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity_max?: number | null
          capacity_min?: number | null
          city?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          display_order?: number | null
          external_link?: string | null
          id?: string
          is_active?: boolean | null
          is_managed?: boolean | null
          location?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_crm_stats: {
        Row: {
          inquiries_last_week: number | null
          new_inquiries: number | null
          new_quotes: number | null
          quotes_last_week: number | null
        }
        Relationships: []
      }
      v_rental_items_summary: {
        Row: {
          category_name: string | null
          category_slug: string | null
          created_at: string | null
          id: string | null
          is_active: boolean | null
          is_popular: boolean | null
          name: string | null
          sku: string | null
          slug: string | null
          updated_at: string | null
          view_count: number | null
        }
        Relationships: []
      }
      v_services_summary: {
        Row: {
          created_at: string | null
          id: string | null
          is_active: boolean | null
          name: string | null
          package_count: number | null
          process_step_count: number | null
          slug: string | null
          updated_at: string | null
          use_case_count: number | null
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          is_active?: boolean | null
          name?: string | null
          package_count?: never
          process_step_count?: never
          slug?: string | null
          updated_at?: string | null
          use_case_count?: never
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          is_active?: boolean | null
          name?: string | null
          package_count?: never
          process_step_count?: never
          slug?: string | null
          updated_at?: string | null
          use_case_count?: never
          view_count?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      inquiry_status: "new" | "reviewed" | "contacted" | "closed" | "spam"
      quote_status:
        | "new"
        | "reviewed"
        | "quoted"
        | "accepted"
        | "declined"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      inquiry_status: ["new", "reviewed", "contacted", "closed", "spam"],
      quote_status: [
        "new",
        "reviewed",
        "quoted",
        "accepted",
        "declined",
        "expired",
      ],
    },
  },
} as const
