import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { EmployeeProfileClient } from "@/components/employees/EmployeeProfileClient";
import { EMPLOYEES, PROJECTS, PROJECT_MEMBERS } from "@/lib/data-store";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const employee = EMPLOYEES.find((e) => e.id === id);
  return {
    title: employee ? `${employee.name} — Profile` : "Employee Profile",
  };
}

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_ALL_EMPLOYEES")) {
    redirect("/unauthorized");
  }

  const { id } = await params;
  const employee = EMPLOYEES.find((e) => e.id === id);
  if (!employee) {
    notFound();
  }

  const manager = employee.managerId
    ? EMPLOYEES.find((e) => e.id === employee.managerId) ?? null
    : null;

  // Collaborators: teammates on same team + project peers
  const teamMates = EMPLOYEES.filter(
    (e) => e.teamId === employee.teamId && e.id !== employee.id
  ).slice(0, 4);

  // Projects
  const activeProjs: string[] = [];
  PROJECT_MEMBERS.forEach((pm) => {
    if (pm.empIds.includes(employee.id)) {
      const proj = PROJECTS.find((p) => p.id === pm.projId);
      if (proj) activeProjs.push(proj.name);
    }
  });

  return (
    <div className="p-8">
      <EmployeeProfileClient
        employee={employee}
        manager={manager}
        collaborators={teamMates}
        projects={activeProjs}
      />
    </div>
  );
}
