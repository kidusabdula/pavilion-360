// app/(cms)/cms/team-members/[id]/page.tsx
// CMS Team Member Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, ExternalLink, ArrowLeft, Users, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useTeamMember } from "@/hooks/cms/use-team-members";

interface TeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default function TeamMemberDetailPage({ params }: TeamMemberPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useTeamMember(id);
  
  const member = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Team Members", href: "/cms/team-members" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
      </div>
    );
  }
  
  if (error || !member) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Team Members", href: "/cms/team-members" },
            { label: "Detail" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Team member not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/team-members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team Members
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={member.name}
        description={member.role}
        breadcrumbs={[
          { label: "Team Members", href: "/cms/team-members" },
          { label: member.name },
        ]}
        actions={
          <Button asChild>
            <Link href={`/cms/team-members/${member.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Profile Image */}
          {member.image_url && (
            <div className="relative aspect-square w-64 h-64 overflow-hidden rounded-xl border border-border mx-auto">
              <Image
                src={member.image_url}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Bio */}
          {member.bio && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Bio</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">{member.bio}</p>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active</span>
                <StatusBadge status={member.is_active ? "active" : "inactive"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{member.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
            <div className="space-y-3">
              {member.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {member.email}
                  </a>
                </div>
              )}
              {member.linkedin_url && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={member.linkedin_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(member.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(member.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}