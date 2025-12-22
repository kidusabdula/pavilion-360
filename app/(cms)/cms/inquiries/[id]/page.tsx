"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useInquiry } from "@/hooks/cms/use-inquiries";
import { INQUIRY_STATUSES } from "@/lib/schemas/inquiry.schema";

interface InquiryPageProps {
  params: Promise<{ id: string }>;
}

export default function InquiryPage({ params }: InquiryPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useInquiry(id);

  const inquiry = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Inquiries", href: "/cms/inquiries" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Inquiries", href: "/cms/inquiries" },
            { label: "Detail" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Inquiry not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/inquiries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Inquiries
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Inquiry from ${inquiry.name}`}
        breadcrumbs={[
          { label: "Inquiries", href: "/cms/inquiries" },
          { label: inquiry.name },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {inquiry.email}
                </a>
              </div>

              {inquiry.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                </div>
              )}

              {inquiry.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{inquiry.company}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message Card */}
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{inquiry.message}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusBadge status={inquiry.status || "new"} />
            </CardContent>
          </Card>

          {/* Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span>{inquiry.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Received</span>
                <span>
                  {inquiry.created_at
                    ? new Date(inquiry.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {inquiry.updated_at
                    ? new Date(inquiry.updated_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
