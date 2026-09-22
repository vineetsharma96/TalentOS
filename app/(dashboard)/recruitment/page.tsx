import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { RecruitmentClient } from "@/components/recruitment/RecruitmentClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment Intelligence",
};

export default async function RecruitmentPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_RECRUITMENT")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <RecruitmentClient />
    </div>
  );
}
