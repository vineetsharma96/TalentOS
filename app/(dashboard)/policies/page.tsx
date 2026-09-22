import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { PoliciesClient } from "@/components/policies/PoliciesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Policy Reasoning",
};

export default async function PoliciesPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_POLICIES")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <PoliciesClient />
    </div>
  );
}
