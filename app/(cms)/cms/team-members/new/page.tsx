// app/(cms)/cms/team-members/new/page.tsx
// CMS Create Team Member page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { TeamMemberForm } from "@/components/cms/modules/team-members/team-member-form";
import { useCreateTeamMember } from "@/hooks/cms/use-team-members";
import { toast } from "sonner";
import type { CreateTeamMemberInput } from "@/lib/schemas/team-member.schema";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const createMutation = useCreateTeamMember();
  
  const handleSubmit = async (data: CreateTeamMemberInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Team member created successfully");
      router.push("/cms/team-members");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create team member"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Team Member"
        description="Add a new team member"
        breadcrumbs={[
          { label: "Team Members", href: "/cms/team-members" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <TeamMemberForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}