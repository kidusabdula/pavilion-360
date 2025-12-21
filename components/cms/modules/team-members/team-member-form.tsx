// components/cms/modules/team-members/team-member-form.tsx
// Reusable team member form for create/edit
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/cms/forms";
import {
  createTeamMemberSchema,
  type CreateTeamMemberInput,
} from "@/lib/schemas/team-member.schema";

interface TeamMemberFormProps {
  initialData?: Partial<CreateTeamMemberInput> & { id?: string };
  onSubmit: (data: CreateTeamMemberInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function TeamMemberForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: TeamMemberFormProps) {
  const router = useRouter();

  const form = useForm<CreateTeamMemberInput>({
    resolver: zodResolver(createTeamMemberSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      bio: initialData?.bio || undefined,
      image_url: initialData?.image_url || undefined,
      email: initialData?.email || undefined,
      linkedin_url: initialData?.linkedin_url || undefined,
      display_order: initialData?.display_order ?? 0,
      is_active: initialData?.is_active ?? true,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl space-y-8"
    >
      {/* Basic Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Basic Information</h2>
        <div className="space-y-4">
          {/* Name */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="after:ml-0.5 after:text-red-500 after:content-['*']"
              >
                Name
              </Label>
              <Input id="name" {...register("name")} placeholder="John Doe" />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="after:ml-0.5 after:text-red-500 after:content-['*']"
              >
                Role
              </Label>
              <Input
                id="role"
                {...register("role")}
                placeholder="Event Manager"
              />
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Brief biography..."
              rows={5}
            />
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Profile Image</h2>
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <ImageUpload
            value={watch("image_url")}
            onChange={(url) => setValue("image_url", url)}
            folder="team"
            aspectRatio="square"
          />
          <p className="text-xs text-muted-foreground">
            Recommended aspect ratio: 1:1 (square)
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Contact Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
            <Input
              id="linkedin_url"
              {...register("linkedin_url")}
              placeholder="https://linkedin.com/in/username"
            />
            {errors.linkedin_url && (
              <p className="text-sm text-red-500">
                {errors.linkedin_url.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Settings</h2>
        <div className="space-y-4">
          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              {...register("display_order", { valueAsNumber: true })}
              min={0}
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first
            </p>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="is_active">Active</Label>
              <p className="text-sm text-muted-foreground">
                Visible on the public site
              </p>
            </div>
            <Switch
              id="is_active"
              checked={watch("is_active")}
              onCheckedChange={(checked) => setValue("is_active", checked)}
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Team Member" : "Create Team Member"}
        </Button>
      </div>
    </form>
  );
}
