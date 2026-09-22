import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { MobilityClient } from "@/components/mobility/MobilityClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Talent Marketplace",
};

export default async function MobilityPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_MOBILITY")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <MobilityClient />
    </div>
  );
}
