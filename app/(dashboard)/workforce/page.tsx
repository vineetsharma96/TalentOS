import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { WorkforceClient } from "@/components/workforce/WorkforceClient";
import { getFallbackDashboardMetrics } from "@/lib/data-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workforce Overview",
};

export default async function WorkforcePage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_ALL_EMPLOYEES")) {
    redirect("/unauthorized");
  }

  const metrics = getFallbackDashboardMetrics();

  return (
    <div className="p-8">
      <WorkforceClient
        total={metrics.total}
        departments={metrics.departments}
        topSkills={metrics.topSkills}
        highRisks={metrics.highRisks.map((e) => ({
          id: e.id,
          name: e.name,
          role: e.role,
          department: e.department,
          team: e.team,
          riskScore: e.riskScore ?? 0.8,
          riskFactor: e.riskFactor,
          photoUrl: e.photoUrl,
        }))}
        activeProjects={metrics.activeProjects}
        graphDensity={metrics.graphDensity}
      />
    </div>
  );
}
