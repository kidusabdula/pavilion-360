# Pavilion360 V2.0 - CMS UI Template & Design Guidelines

> **Version:** 2.0.0  
> **Last Updated:** December 18, 2024  
> **Status:** Planning Phase  

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Animation Guidelines](#animation-guidelines)
7. [Layout Templates](#layout-templates)
8. [Mobile Responsiveness](#mobile-responsiveness)
9. [Accessibility](#accessibility)
10. [Icon System](#icon-system)

---

## Design Philosophy

### Core Principles

1. **Premium & Professional**
   - Clean, sophisticated aesthetic that matches the main Pavilion360 brand
   - High-grade finishes, subtle gradients, and refined interactions
   - No cluttered interfaces - generous whitespace

2. **Mobile-First**
   - Design for mobile screens first, then scale up
   - Touch-friendly interactions (44px minimum tap targets)
   - Responsive data tables that work on all screen sizes

3. **Consistent & Templated**
   - Every module follows the same layout patterns
   - Reusable components across all CRUD operations
   - Predictable navigation and interactions

4. **Animated & Dynamic**
   - Meaningful micro-animations for feedback
   - Smooth transitions between states
   - Loading states that feel polished

5. **Accessible**
   - WCAG 2.1 AA compliance
   - Keyboard navigable
   - Screen reader friendly

---

## Color System

### Brand Colors

```css
/* Primary - Pavilion360 Accent (Golden/Amber) */
--accent: 45 93% 47%;           /* HSL - Main brand color */
--accent-foreground: 0 0% 0%;   /* Black text on accent */

/* The accent color from the main site */
--color-accent: hsl(45, 93%, 47%);      /* #E5A500 - Golden */
--color-accent-hover: hsl(45, 93%, 42%); /* Darker on hover */
--color-accent-light: hsl(45, 93%, 95%); /* Light background */
```

### CMS Theme Colors

```css
/* Light Theme */
--background: 0 0% 100%;           /* White */
--foreground: 222 47% 11%;         /* Near black */
--card: 0 0% 100%;                 /* White */
--card-foreground: 222 47% 11%;
--muted: 210 40% 96%;              /* Light gray */
--muted-foreground: 215 16% 47%;   /* Medium gray */
--border: 214 32% 91%;             /* Light border */

/* Dark Theme (Auto-detected) */
--background: 222 47% 11%;         /* Dark blue-black */
--foreground: 210 40% 98%;         /* Near white */
--card: 222 47% 13%;               /* Slightly lighter */
--card-foreground: 210 40% 98%;
--muted: 217 33% 17%;              /* Dark gray */
--muted-foreground: 215 20% 65%;   /* Medium gray */
--border: 217 33% 20%;             /* Dark border */
```

### Semantic Colors

```css
/* Status Colors */
--success: 142 76% 36%;            /* Green */
--success-foreground: 0 0% 100%;
--warning: 38 92% 50%;             /* Orange */
--warning-foreground: 0 0% 0%;
--error: 0 84% 60%;                /* Red */
--error-foreground: 0 0% 100%;
--info: 199 89% 48%;               /* Blue */
--info-foreground: 0 0% 100%;

/* CRM Status Colors */
--status-new: 199 89% 48%;         /* Blue */
--status-reviewed: 38 92% 50%;     /* Orange */
--status-contacted: 142 76% 36%;   /* Green */
--status-closed: 215 16% 47%;      /* Gray */
```

### Color Usage Guidelines

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Page Background | `bg-background` | `bg-background` |
| Card Background | `bg-card` | `bg-card` |
| Sidebar | `bg-muted/50` | `bg-muted/30` |
| Primary Button | `bg-accent` | `bg-accent` |
| Secondary Button | `bg-muted` | `bg-muted` |
| Borders | `border-border` | `border-border` |
| Text Primary | `text-foreground` | `text-foreground` |
| Text Secondary | `text-muted-foreground` | `text-muted-foreground` |

---

## Typography

### Font Stack

```css
/* System font stack for body */
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;

/* Inter for headings (from main site) */
--font-heading: 'Inter', var(--font-sans);

/* Mono for code/technical */
--font-mono: 'Geist Mono', 'Fira Code', 'Monaco', monospace;
```

### Type Scale

| Name | Size | Weight | Use Case |
|------|------|--------|----------|
| `text-xs` | 12px | 400 | Labels, captions |
| `text-sm` | 14px | 400 | Body small, table cells |
| `text-base` | 16px | 400 | Body default |
| `text-lg` | 18px | 500 | Subheadings |
| `text-xl` | 20px | 600 | Card titles |
| `text-2xl` | 24px | 700 | Page sections |
| `text-3xl` | 30px | 700 | Page titles |
| `text-4xl` | 36px | 800 | Dashboard stats |

### Typography Patterns

```jsx
// Page Title
<h1 className="text-3xl font-bold tracking-tight">Services</h1>

// Page Subtitle
<p className="text-muted-foreground">Manage your service offerings</p>

// Section Header
<h2 className="text-xl font-semibold">Basic Information</h2>

// Card Title
<h3 className="text-lg font-semibold">Service Details</h3>

// Label
<label className="text-sm font-medium">Name</label>

// Helper Text
<span className="text-xs text-muted-foreground">Required</span>

// Table Header
<th className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>

// Table Cell
<td className="text-sm">Event Planning & Management</td>
```

---

## Spacing & Layout

### Spacing Scale

```css
/* Tailwind default spacing (4px base) */
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
```

### Layout Constants

```css
/* CMS Layout */
--sidebar-width: 280px;
--sidebar-collapsed-width: 72px;
--header-height: 64px;
--content-max-width: 1400px;
--form-max-width: 800px;

/* Mobile Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Common Spacing Patterns

```jsx
// Page Container
<div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">

// Card Padding
<div className="p-4 lg:p-6">

// Form Sections
<div className="space-y-6">

// Form Fields
<div className="space-y-4">

// Button Groups
<div className="flex gap-3">

// Table Cells
<td className="px-4 py-3">

// Section Margins
<section className="mt-8">
```

---

## Component Library

### CMS Layout Shell

```jsx
// components/cms/layout/cms-shell.tsx
<div className="flex min-h-screen bg-background">
  {/* Sidebar */}
  <aside className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-border bg-card lg:static">
    <CMSSidebar />
  </aside>
  
  {/* Main Content */}
  <div className="flex-1 flex flex-col lg:ml-0">
    <CMSHeader />
    <main className="flex-1 overflow-auto p-4 lg:p-8">
      {children}
    </main>
  </div>
</div>
```

### Sidebar Component

```jsx
// components/cms/layout/cms-sidebar.tsx
<nav className="flex flex-col h-full">
  {/* Logo */}
  <div className="h-16 flex items-center px-6 border-b border-border">
    <Logo className="h-8 w-auto" />
    <span className="ml-2 font-bold text-lg">CMS</span>
  </div>
  
  {/* Navigation */}
  <ScrollArea className="flex-1 py-4">
    <div className="space-y-1 px-3">
      {/* Navigation Items */}
      <NavItem 
        icon={LayoutDashboard} 
        label="Dashboard" 
        href="/cms" 
        active={pathname === '/cms'}
      />
      
      {/* Section Header */}
      <div className="pt-4 pb-2 px-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Content
        </span>
      </div>
      
      <NavItem icon={Briefcase} label="Services" href="/cms/services" />
      <NavItem icon={Package} label="Rentals" href="/cms/rentals" />
      {/* ... more items */}
    </div>
  </ScrollArea>
  
  {/* User Section */}
  <div className="p-4 border-t border-border">
    <UserMenu />
  </div>
</nav>
```

### Sidebar NavItem

```jsx
// Active state
<Link
  href={href}
  className={cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
    active
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  )}
>
  <Icon className="h-5 w-5" />
  {label}
</Link>
```

### Page Header Component

```jsx
// components/cms/shared/page-header.tsx
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <Breadcrumb items={breadcrumbs} />
    <h1 className="text-3xl font-bold tracking-tight mt-2">{title}</h1>
    {description && (
      <p className="text-muted-foreground mt-1">{description}</p>
    )}
  </div>
  {actions && (
    <div className="flex gap-3">
      {actions}
    </div>
  )}
</div>

// Usage
<PageHeader
  title="Services"
  description="Manage your service offerings"
  breadcrumbs={[{ label: 'Dashboard', href: '/cms' }, { label: 'Services' }]}
  actions={
    <Button asChild>
      <Link href="/cms/services/new">
        <Plus className="mr-2 h-4 w-4" />
        Add Service
      </Link>
    </Button>
  }
/>
```

### Data Table Component

```jsx
// components/cms/data-table/data-table.tsx
<div className="rounded-lg border border-border bg-card overflow-hidden">
  {/* Toolbar */}
  <div className="flex items-center justify-between p-4 border-b border-border">
    <div className="flex flex-1 items-center gap-2">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Filters */}
    </div>
    <div className="flex items-center gap-2">
      {/* Column visibility, export, etc. */}
    </div>
  </div>
  
  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border bg-muted/50">
          <th className="h-12 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Name
          </th>
          {/* More headers */}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr 
            key={row.id} 
            className="border-b border-border hover:bg-muted/50 transition-colors"
          >
            <td className="px-4 py-3 text-sm">{row.name}</td>
            {/* More cells */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  {/* Pagination */}
  <div className="flex items-center justify-between p-4 border-t border-border">
    <div className="text-sm text-muted-foreground">
      Showing {start} to {end} of {total} results
    </div>
    <Pagination />
  </div>
</div>
```

### Form Layout

```jsx
// Standard form layout for create/edit pages
<div className="max-w-[800px]">
  <form onSubmit={handleSubmit} className="space-y-8">
    {/* Basic Information Section */}
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
      <div className="space-y-4">
        <FormField
          label="Name"
          name="name"
          required
          error={errors.name?.message}
        >
          <Input {...register('name')} />
        </FormField>
        
        <FormField
          label="Slug"
          name="slug"
          hint="URL-friendly identifier"
        >
          <SlugInput
            value={slug}
            onChange={setSlug}
            basePath="/services/"
          />
        </FormField>
      </div>
    </div>
    
    {/* Media Section */}
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Media</h2>
      <div className="space-y-4">
        <FormField label="Thumbnail">
          <ImageUpload
            value={thumbnail}
            onChange={setThumbnail}
            folder="services/thumbnails"
          />
        </FormField>
      </div>
    </div>
    
    {/* Submit Buttons */}
    <div className="flex items-center justify-end gap-3">
      <Button type="button" variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEdit ? 'Save Changes' : 'Create Service'}
      </Button>
    </div>
  </form>
</div>
```

### Form Field Component

```jsx
// components/cms/forms/form-field.tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
      {label}
    </Label>
    {hint && (
      <span className="text-xs text-muted-foreground">{hint}</span>
    )}
  </div>
  {children}
  {error && (
    <p className="text-sm text-red-500 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {error}
    </p>
  )}
</div>
```

### Image Upload Component

```jsx
// components/cms/forms/image-upload.tsx
<div className="space-y-2">
  {value ? (
    <div className="relative group aspect-video rounded-lg overflow-hidden border border-border bg-muted">
      <Image
        src={value}
        alt="Upload preview"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <Button size="sm" variant="secondary" onClick={handleReplace}>
          <Replace className="h-4 w-4 mr-1" />
          Replace
        </Button>
        <Button size="sm" variant="destructive" onClick={handleRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ) : (
    <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/80 cursor-pointer transition-colors">
      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
      <span className="text-sm text-muted-foreground">Click to upload</span>
      <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleUpload}
      />
    </label>
  )}
  {isUploading && (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      Uploading...
    </div>
  )}
</div>
```

### Rich Text Editor (TipTap)

```jsx
// components/cms/forms/rich-text-editor.tsx
<div className="rounded-lg border border-border bg-card overflow-hidden">
  {/* Toolbar */}
  <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50 flex-wrap">
    <ToolbarButton 
      icon={Bold} 
      active={editor.isActive('bold')} 
      onClick={() => editor.chain().focus().toggleBold().run()} 
    />
    <ToolbarButton 
      icon={Italic} 
      active={editor.isActive('italic')} 
      onClick={() => editor.chain().focus().toggleItalic().run()} 
    />
    <ToolbarDivider />
    <ToolbarButton 
      icon={Heading1} 
      active={editor.isActive('heading', { level: 1 })} 
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
    />
    <ToolbarButton 
      icon={Heading2} 
      active={editor.isActive('heading', { level: 2 })} 
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
    />
    <ToolbarDivider />
    <ToolbarButton 
      icon={List} 
      active={editor.isActive('bulletList')} 
      onClick={() => editor.chain().focus().toggleBulletList().run()} 
    />
    <ToolbarButton 
      icon={ListOrdered} 
      active={editor.isActive('orderedList')} 
      onClick={() => editor.chain().focus().toggleOrderedList().run()} 
    />
    <ToolbarDivider />
    <ToolbarButton 
      icon={Link2} 
      active={editor.isActive('link')} 
      onClick={handleAddLink} 
    />
    <ToolbarButton 
      icon={ImageIcon} 
      onClick={handleAddImage} 
    />
  </div>
  
  {/* Editor */}
  <EditorContent 
    editor={editor} 
    className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none"
  />
</div>

// Toolbar Button
<button
  type="button"
  onClick={onClick}
  className={cn(
    "p-2 rounded hover:bg-muted transition-colors",
    active && "bg-muted text-accent"
  )}
>
  <Icon className="h-4 w-4" />
</button>
```

### Status Badge

```jsx
// components/cms/shared/status-badge.tsx
const statusConfig = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  reviewed: { label: 'Reviewed', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  contacted: { label: 'Contacted', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  closed: { label: 'Closed', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' },
};

<span className={cn(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
  statusConfig[status].className
)}>
  {statusConfig[status].label}
</span>
```

### Empty State

```jsx
// components/cms/shared/empty-state.tsx
<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
  <div className="rounded-full bg-muted p-4 mb-4">
    <Icon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-1">{title}</h3>
  <p className="text-muted-foreground text-sm mb-4 max-w-sm">{description}</p>
  {action && (
    <Button asChild>
      <Link href={action.href}>
        <Plus className="mr-2 h-4 w-4" />
        {action.label}
      </Link>
    </Button>
  )}
</div>

// Usage
<EmptyState
  icon={Briefcase}
  title="No services yet"
  description="Get started by creating your first service."
  action={{ label: 'Add Service', href: '/cms/services/new' }}
/>
```

### Loading Skeleton

```jsx
// components/cms/shared/loading-skeleton.tsx

// Table Skeleton
<div className="rounded-lg border border-border bg-card overflow-hidden animate-pulse">
  <div className="p-4 border-b border-border">
    <div className="h-10 w-64 bg-muted rounded" />
  </div>
  <div className="divide-y divide-border">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 bg-muted rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-48 bg-muted rounded" />
          <div className="h-3 w-32 bg-muted rounded" />
        </div>
        <div className="h-8 w-20 bg-muted rounded" />
      </div>
    ))}
  </div>
</div>

// Form Skeleton
<div className="max-w-[800px] space-y-8 animate-pulse">
  <div className="rounded-lg border border-border bg-card p-6 space-y-4">
    <div className="h-6 w-32 bg-muted rounded" />
    <div className="space-y-2">
      <div className="h-4 w-16 bg-muted rounded" />
      <div className="h-10 w-full bg-muted rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-24 bg-muted rounded" />
      <div className="h-10 w-full bg-muted rounded" />
    </div>
  </div>
</div>
```

### Confirm Dialog

```jsx
// components/cms/shared/confirm-dialog.tsx
<AlertDialog open={open} onOpenChange={onOpenChange}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex items-center gap-2">
        {variant === 'destructive' && <AlertTriangle className="h-5 w-5 text-red-500" />}
        {title}
      </AlertDialogTitle>
      <AlertDialogDescription>{description}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={onConfirm}
        className={cn(
          variant === 'destructive' && "bg-red-500 hover:bg-red-600"
        )}
      >
        {confirmLabel}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Usage
<ConfirmDialog
  open={showDeleteDialog}
  onOpenChange={setShowDeleteDialog}
  title="Delete Service?"
  description="This action cannot be undone. The service will be permanently removed."
  confirmLabel="Delete"
  variant="destructive"
  onConfirm={handleDelete}
/>
```

### Stats Card (Dashboard)

```jsx
// components/cms/dashboard/stats-card.tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  className="rounded-xl border border-border bg-card p-6"
>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {change && (
        <p className={cn(
          "text-xs mt-1 flex items-center gap-1",
          change > 0 ? "text-green-500" : "text-red-500"
        )}>
          {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(change)}% from last month
        </p>
      )}
    </div>
    <div className={cn(
      "p-3 rounded-xl",
      iconBg || "bg-accent/10"
    )}>
      <Icon className={cn("h-6 w-6", iconColor || "text-accent")} />
    </div>
  </div>
</motion.div>
```

---

## Animation Guidelines

### Framer Motion Defaults

```typescript
// lib/constants/animations.ts

// Fade in up (for page content)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

// Fade in (for overlays)
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

// Slide from right (for sidebars, drawers)
export const slideFromRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 25, stiffness: 200 }
};

// Scale (for modals, cards)
export const scale = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2 }
};

// Stagger children
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};
```

### Animation Usage Patterns

```jsx
// Page load animation
<motion.div
  initial="initial"
  animate="animate"
  variants={fadeInUp}
>
  <PageContent />
</motion.div>

// List animations
<motion.div variants={staggerContainer} initial="initial" animate="animate">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItem}>
      <ItemCard item={item} />
    </motion.div>
  ))}
</motion.div>

// Hover animations
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>

// Loading spinner
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
>
  <Loader2 className="h-4 w-4" />
</motion.div>
```

### Tailwind Transitions

```css
/* Default transitions */
.transition-colors { transition-property: color, background-color, border-color; transition-duration: 150ms; }
.transition-all { transition-property: all; transition-duration: 150ms; }
.transition-transform { transition-property: transform; transition-duration: 150ms; }

/* Custom duration classes */
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.duration-500 { transition-duration: 500ms; }
```

---

## Layout Templates

### List Page Template

```jsx
export default function ModuleListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Manage your service offerings"
        breadcrumbs={[
          { label: 'Dashboard', href: '/cms' },
          { label: 'Services' }
        ]}
        actions={
          <Button asChild>
            <Link href="/cms/services/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Link>
          </Button>
        }
      />
      
      <Suspense fallback={<TableSkeleton />}>
        <ServiceTable />
      </Suspense>
    </div>
  );
}
```

### Create/Edit Page Template

```jsx
export default function ModuleCreatePage() {
  const router = useRouter();
  const createMutation = useCreateService();
  
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      slug: '',
      // ...
    }
  });
  
  const onSubmit = async (data) => {
    try {
      await createMutation.mutateAsync(data);
      router.push('/cms/services');
    } catch (error) {
      // Error handled by mutation
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Service"
        breadcrumbs={[
          { label: 'Dashboard', href: '/cms' },
          { label: 'Services', href: '/cms/services' },
          { label: 'New' }
        ]}
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ServiceForm form={form} isSubmitting={createMutation.isPending} />
        </form>
      </Form>
    </div>
  );
}
```

### Detail Page Template

```jsx
export default function ModuleDetailPage({ params }) {
  const { data: service, isLoading } = useService(params.id);
  
  if (isLoading) return <DetailSkeleton />;
  if (!service) return <NotFound />;
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={service.name}
        breadcrumbs={[
          { label: 'Dashboard', href: '/cms' },
          { label: 'Services', href: '/cms/services' },
          { label: service.name }
        ]}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href={`/services/${service.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/cms/services/${service.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoCard service={service} />
          <UseCasesCard useCases={service.use_cases} />
          <ProcessCard steps={service.process_steps} />
        </div>
        <div className="space-y-6">
          <MediaCard thumbnail={service.thumbnail_url} gallery={service.gallery} />
          <StatsCard views={service.view_count} />
        </div>
      </div>
    </div>
  );
}
```

---

## Mobile Responsiveness

### Breakpoint Strategy

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | < 640px | Single column, collapsed sidebar |
| Tablet | 640px - 1024px | Two columns, toggleable sidebar |
| Desktop | 1024px+ | Full layout, persistent sidebar |

### Mobile Sidebar

```jsx
// On mobile, sidebar becomes a sheet
const isMobile = useMediaQuery('(max-width: 1024px)');

{isMobile ? (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[280px] p-0">
      <CMSSidebar onNavigate={() => setOpen(false)} />
    </SheetContent>
  </Sheet>
) : (
  <aside className="fixed inset-y-0 left-0 w-[280px] border-r bg-card">
    <CMSSidebar />
  </aside>
)}
```

### Responsive Data Table

```jsx
// On mobile, show card view instead of table
const isMobile = useMediaQuery('(max-width: 640px)');

{isMobile ? (
  <div className="space-y-3">
    {items.map((item) => (
      <MobileCard key={item.id} item={item} />
    ))}
  </div>
) : (
  <Table>
    {/* Full table layout */}
  </Table>
)}

// Mobile Card
<div className="rounded-lg border border-border bg-card p-4">
  <div className="flex items-start gap-3">
    {item.thumbnail && (
      <Image src={item.thumbnail} alt="" className="h-16 w-16 rounded object-cover" />
    )}
    <div className="flex-1 min-w-0">
      <h3 className="font-medium truncate">{item.name}</h3>
      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
      <div className="flex items-center gap-2 mt-2">
        <StatusBadge status={item.status} />
      </div>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Actions */}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
```

### Touch-Friendly Sizing

```css
/* Minimum touch target: 44x44px */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Form inputs */
.form-input {
  height: 44px; /* 48px on mobile */
}

/* Buttons */
.btn {
  height: 40px;
  padding-left: 16px;
  padding-right: 16px;
}

.btn-lg {
  height: 48px;
}
```

---

## Accessibility

### ARIA Patterns

```jsx
// Navigation
<nav aria-label="CMS Navigation">
  <ul role="menu">
    <li role="menuitem">
      <Link href="/cms/services" aria-current={isActive ? 'page' : undefined}>
        Services
      </Link>
    </li>
  </ul>
</nav>

// Data Table
<table role="grid" aria-label="Services table">
  <thead>
    <tr role="row">
      <th role="columnheader" scope="col" aria-sort={sortDirection}>
        Name
      </th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-selected={isSelected}>
      <td role="gridcell">Service Name</td>
    </tr>
  </tbody>
</table>

// Forms
<div role="form" aria-labelledby="form-title">
  <h2 id="form-title">Add Service</h2>
  <div>
    <label htmlFor="name">Name</label>
    <input 
      id="name" 
      aria-required="true" 
      aria-invalid={hasError}
      aria-describedby={hasError ? 'name-error' : undefined}
    />
    {hasError && <p id="name-error" role="alert">{error}</p>}
  </div>
</div>

// Loading states
<div aria-busy={isLoading} aria-live="polite">
  {isLoading ? <Skeleton /> : <Content />}
</div>

// Notifications
<div role="status" aria-live="polite">
  Service created successfully
</div>
```

### Keyboard Navigation

```jsx
// Focus trap in modals
<Dialog>
  <DialogContent>
    {/* Focus automatically trapped here */}
  </DialogContent>
</Dialog>

// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent text-white px-4 py-2 rounded">
  Skip to main content
</a>

// Keyboard-accessible dropdown
<DropdownMenu>
  <DropdownMenuTrigger>
    {/* Opens with Enter/Space, navigates with arrows */}
  </DropdownMenuTrigger>
</DropdownMenu>
```

### Color Contrast

- All text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- Don't rely on color alone for status indication (use icons + labels)
- Error states have both red color AND error icon

---

## Icon System

### Icon Library

Using **Lucide React** icons for consistency with main site.

### Common CMS Icons

```jsx
import {
  // Navigation
  LayoutDashboard,
  Briefcase,          // Services
  Package,            // Rentals
  FolderOpen,         // Portfolio
  Building2,          // Venues
  Users,              // Team
  Quote,              // Testimonials
  HelpCircle,         // FAQs
  FileText,           // Blog
  MessageSquare,      // Inquiries
  ShoppingCart,       // Quotes
  Image as ImageIcon, // Media
  Settings,           // Settings
  
  // Actions
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Download,
  Upload,
  ExternalLink,
  Copy,
  Check,
  X,
  
  // Status
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  
  // UI
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Menu,
  Loader2,
  Eye,
  EyeOff,
  
  // Content
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link2,
  
  // Stats
  TrendingUp,
  TrendingDown,
  BarChart3,
} from 'lucide-react';
```

### Icon Sizes

| Context | Size | Class |
|---------|------|-------|
| Inline with text | 16px | `h-4 w-4` |
| Buttons | 16-20px | `h-4 w-4` or `h-5 w-5` |
| Table cells | 16px | `h-4 w-4` |
| Empty states | 32-48px | `h-8 w-8` or `h-12 w-12` |
| Stats cards | 24px | `h-6 w-6` |
| Sidebar navigation | 20px | `h-5 w-5` |

---

## Quick Reference

### Commonly Used Classes

```css
/* Cards */
.card: rounded-lg border border-border bg-card p-6

/* Buttons */
.btn-primary: bg-accent text-accent-foreground hover:bg-accent/90
.btn-secondary: bg-muted text-foreground hover:bg-muted/80
.btn-outline: border border-input bg-background hover:bg-muted
.btn-ghost: hover:bg-muted
.btn-destructive: bg-red-500 text-white hover:bg-red-600

/* Form inputs */
.input: h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2

/* Text */
.text-primary: text-foreground
.text-secondary: text-muted-foreground
.text-accent: text-accent

/* Shadows */
.shadow-sm: shadow-sm
.shadow-md: shadow-md
.shadow-lg: shadow-lg
```

### Component Import Pattern

```tsx
// Use barrel exports
export * from './button';
export * from './input';
export * from './card';
// etc.

// Import from single source
import { Button, Input, Card } from '@/components/ui';
import { PageHeader, DataTable, EmptyState } from '@/components/cms/shared';
```

---

*This document serves as the definitive UI/UX reference for the Pavilion360 CMS. All components should follow these patterns for consistency.*
