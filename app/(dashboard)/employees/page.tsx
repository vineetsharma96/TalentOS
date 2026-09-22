import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { EmployeesClient } from "@/components/employees/EmployeesClient";
import { EMPLOYEES } from "@/lib/data-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Directory",
};

export default async function EmployeesPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_ALL_EMPLOYEES")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-8">
      <EmployeesClient initialEmployees={EMPLOYEES} userRole={session.user.role} />
    </div>
  );
}
