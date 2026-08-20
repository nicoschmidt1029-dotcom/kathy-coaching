import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;
  if (!tokenHash || !type) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error || !data.user) {
    console.error("Admin OTP verification failed", { code: error?.code, status: error?.status });
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?error=expired", request.url));
  }
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_current_admin");
  if (adminError || isAdmin !== true) {
    console.error("Admin authorization failed", { code: adminError?.code });
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", request.url));
  }
  return NextResponse.redirect(new URL("/admin", request.url));
}
