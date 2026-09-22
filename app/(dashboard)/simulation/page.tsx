import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { SimulationClient } from "@/components/simulation/SimulationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workforce Simulation",
};

export default async function SimulationPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "RUN_SIMULATION")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <SimulationClient />
    </div>
  );
}
