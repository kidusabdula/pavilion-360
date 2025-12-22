"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, ArrowLeft, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/cms";
  const errorParam = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    errorParam ? "Authentication failed. Please try again." : null
  );
  const [loading, setLoading] = useState(false);
  const {
    signInWithEmail,
    signInWithGoogle,
    user,
    loading: authLoading,
  } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push(returnTo);
    }
  }, [user, authLoading, router, returnTo]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signInWithEmail(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(returnTo);
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await signInWithGoogle(returnTo);
    if (error) {
      setError(error.message);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-primary/25">
            <span className="text-2xl font-bold text-primary-foreground">
              P
            </span>
          </div>
          <h1 className="text-2xl font-bold">Pavilion360 CMS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your content
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/5">
          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="mb-6 w-full gap-2"
          >
            <Chrome className="h-4 w-4" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-muted-foreground px-2 text-xs uppercase">
                Or continue with email
              </span>
            </div>
            <div className="w-full border-t border-border" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@pavilion360.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </div>

        {/* Back to site link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pavilion360
          </Link>
        </div>
      </div>
    </div>
  );
}
