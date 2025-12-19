// app/(cms)/layout.tsx
import { CMSShell } from '@/components/cms/layout';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return <CMSShell>{children}</CMSShell>;
}