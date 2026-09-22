import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { getDriver } from "@/lib/neo4j";
import { ConnectionsClient } from "@/components/connections/ConnectionsClient";
import { ErrorPage } from "@/components/errors/ErrorPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Connections",
};

async function getWorkforceGraph() {
  const driver = getDriver();
  const session = driver.session({ database: process.env.NEO4J_DATABASE ?? "neo4j" });

  try {
    const empResult = await session.run(
      `MATCH (e:Employee {isActive: true})
       OPTIONAL MATCH (e)-[:MEMBER_OF]->(t:Team)-[:BELONGS_TO]->(d:Department)
       RETURN e.id AS id, e.name AS name, e.role AS role,
              d.name AS department, t.name AS team, e.photoUrl AS photoUrl`
    );

    const relResult = await session.run(
      `MATCH (a:Employee {isActive: true})-[r]->(b:Employee {isActive: true})
       WHERE type(r) IN ['REPORTS_TO', 'MENTORS', 'COLLABORATED_WITH']
       RETURN a.id AS sourceId, b.id AS targetId, type(r) AS relType, r.projectId AS projectId`
    );

    const teamRelResult = await session.run(
      `MATCH (a:Employee {isActive: true})-[:MEMBER_OF]->(t:Team)<-[:MEMBER_OF]-(b:Employee {isActive: true})
       WHERE a.id < b.id
       RETURN a.id AS sourceId, b.id AS targetId, t.name AS team`
    );

    const employees = empResult.records.map((r, i) => ({
      id: r.get("id") as string,
      type: "hexEmployee" as const,
      position: {
        x: (i % 12) * 180,
        y: Math.floor(i / 12) * 200,
      },
      data: {
        employeeId: r.get("id") as string,
        name: r.get("name") as string,
        role: r.get("role") as string,
        department: (r.get("department") as string) ?? "Unknown",
        photoUrl: r.get("photoUrl") as string,
        state: "default" as const,
      },
    }));

    const edges = [
      ...relResult.records.map((r, i) => ({
        id: `rel-${i}`,
        source: r.get("sourceId") as string,
        target: r.get("targetId") as string,
        type: "smoothstep" as const,
        data: {
          connectionType: r.get("relType") as "REPORTS_TO" | "MENTORS" | "COLLABORATED_WITH",
          label:
            r.get("relType") === "REPORTS_TO"
              ? "Reports to"
              : r.get("relType") === "MENTORS"
              ? "Mentors"
              : "Collaborated",
          projectName: r.get("projectId") as string | undefined,
          state: "default" as const,
        },
      })),
      ...teamRelResult.records.map((r, i) => ({
        id: `team-${i}`,
        source: r.get("sourceId") as string,
        target: r.get("targetId") as string,
        type: "smoothstep" as const,
        data: {
          connectionType: "SAME_TEAM" as const,
          label: `Same team: ${r.get("team") as string}`,
          state: "default" as const,
        },
      })),
    ];

    const departments = [...new Set(employees.map((e) => e.data.department).filter(Boolean))];

    return {
      nodes: employees,
      edges,
      meta: {
        totalEmployees: employees.length,
        totalConnections: edges.length,
        departments,
      },
    };
  } finally {
    await session.close();
  }
}

export default async function ConnectionsPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "VIEW_GRAPH")) {
    redirect("/unauthorized");
  }

  let graphData;
  try {
    const { isNeo4jConfigured } = await import("@/lib/neo4j");
    if (isNeo4jConfigured()) {
      graphData = await getWorkforceGraph();
    } else {
      const { getFallbackGraph } = await import("@/lib/data-store");
      graphData = getFallbackGraph();
    }
  } catch (error) {
    console.warn("[Connections] Neo4j fetch failed, using fallback graph:", error);
    const { getFallbackGraph } = await import("@/lib/data-store");
    graphData = getFallbackGraph();
  }

  return (
    <div className="flex flex-col h-screen">
      <ConnectionsClient initialGraph={graphData} />
    </div>
  );
}
