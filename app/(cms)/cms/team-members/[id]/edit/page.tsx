// app/(cms)/cms/team-members/[id]/edit/page.tsx
// CMS Edit Team Member page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { TeamMemberForm } from "@/components/cms/modules/team-members/team-member-form";
import { useTeamMember, useUpdateTeamMember } from "@/hooks/cms/use-team-members";
import { toast } from "sonner";
import type { CreateTeamMemberInput } from "@/lib/schemas/team-member.schema";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useTeamMember(id);
  const updateMutation = useUpdateTeamMember();
  
  const member = data?.data;
  
  const handleSubmit = async (formData: CreateTeamMemberInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("Team member updated successfully");
      router.push(`/cms/team-members/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update team member"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Team Members", href: "/cms/team-members" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
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
            { label: "Edit" },
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
  
  // Transform member data for form
  const initialData: Partial<CreateTeamMemberInput> = {
    name: member.name,
    role: member.role,
    bio: member.bio ?? undefined,
    image_url: member.image_url ?? undefined,
    email: member.email ?? undefined,
    linkedin_url: member.linkedin_url ?? undefined,
    display_order: member.display_order ?? 0,
    is_active: member.is_active ?? true,
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${member.name}`}
        description="Update team member details"
        breadcrumbs={[
          { label: "Team Members", href: "/cms/team-members" },
          { label: member.name, href: `/cms/team-members/${id}` },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <TeamMemberForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}