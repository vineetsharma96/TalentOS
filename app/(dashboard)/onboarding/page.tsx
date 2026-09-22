import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { OnboardingClient } from "@/components/onboarding/OnboardingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaptive Onboarding",
};

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_ONBOARDING")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <OnboardingClient />
    </div>
  );
}
