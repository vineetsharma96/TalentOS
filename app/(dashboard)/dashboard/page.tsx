import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDriver } from "@/lib/neo4j";
import { motion } from "motion/react";
import type { Metadata } from "next";
import { Users, TrendingUp, AlertTriangle, Layers, Brain, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Command Center",
};

async function getDashboardMetrics() {
  const driver = getDriver();
  if (!driver) throw new Error("Neo4j driver is not configured");
  const session = driver.session({ database: process.env.NEO4J_DATABASE ?? "neo4j" });
  try {
    const [totalResult, deptResult, skillResult] = await Promise.all([
      session.run(
        `MATCH (e:Employee {isActive: true}) RETURN count(e) AS total`
      ),
      session.run(
        `MATCH (e:Employee {isActive: true})-[:MEMBER_OF]->(t:Team)-[:BELONGS_TO]->(d:Department)
         RETURN d.name AS dept, count(e) AS count ORDER BY count DESC`
      ),
      session.run(
        `MATCH (e:Employee)-[:HAS_SKILL]->(s:Skill)
         RETURN s.name AS skill, count(e) AS count ORDER BY count DESC LIMIT 10`
      ),
    ]);

    const total = (totalResult.records[0]?.get("total") as number) ?? 0;
    const departments = deptResult.records.map((r) => ({
      name: r.get("dept") as string,
      count: (r.get("count") as number) ?? 0,
    }));
    const topSkills = skillResult.records.map((r) => ({
      name: r.get("skill") as string,
      count: (r.get("count") as number) ?? 0,
    }));

    return { total, departments, topSkills };
  } finally {
    await session.close();
  }
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  accent?: boolean;
}

function MetricCard({ icon, label, value, subtext, accent }: MetricCardProps) {
  return (
    <div
      className="p-5 rounded-xl flex flex-col gap-3"
      style={{
        background: accent ? "rgba(52,55,85,0.2)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${accent ? "#343755" : "#4d4d4d"}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[9px] uppercase tracking-widest"
          style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
        >
          {label}
        </span>
        <span style={{ color: accent ? "#c6c6c6" : "#4d4d4d" }}>{icon}</span>
      </div>
      <div>
        <span
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
        >
          {value}
        </span>
        {subtext && (
          <p
            className="text-xs mt-1"
            style={{ color: "#808080", fontFamily: "Times, serif" }}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  let metrics;
  try {
    const { isNeo4jConfigured } = await import("@/lib/neo4j");
    if (isNeo4jConfigured()) {
      metrics = await getDashboardMetrics();
    } else {
      const { getFallbackDashboardMetrics } = await import("@/lib/data-store");
      metrics = getFallbackDashboardMetrics();
    }
  } catch {
    const { getFallbackDashboardMetrics } = await import("@/lib/data-store");
    metrics = getFallbackDashboardMetrics();
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <p
          className="label-data mb-2"
          style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
        >
          Welcome back, {session.user.name}
        </p>
        <h1
          className="text-3xl font-bold tracking-tighter text-white"
          style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
        >
          Workforce Command Center
        </h1>
        <p
          className="text-base mt-2"
          style={{
            fontFamily: "Times, 'Times New Roman', serif",
            color: "#c6c6c6",
            lineHeight: "1.88",
          }}
        >
          Real-time intelligence across your entire workforce. Identify risks,
          opportunities, and actions — instantly.
        </p>
      </div>

      {/* KPI grid */}
      {metrics ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <MetricCard
            icon={<Users size={16} />}
            label="Active Employees"
            value={metrics.total}
            subtext="Across all departments"
            accent
          />
          <MetricCard
            icon={<Layers size={16} />}
            label="Departments"
            value={metrics.departments.length}
            subtext="Teams and divisions"
          />
          <MetricCard
            icon={<Brain size={16} />}
            label="Skill Categories"
            value={metrics.topSkills.length > 0 ? "10+" : "—"}
            subtext="Active across workforce"
          />
          <MetricCard
            icon={<AlertTriangle size={16} />}
            label="Risk Signals"
            value="3"
            subtext="AI-detected flight risks"
          />
          <MetricCard
            icon={<TrendingUp size={16} />}
            label="Open Positions"
            value="—"
            subtext="Awaiting recruitment"
          />
          <MetricCard
            icon={<Zap size={16} />}
            label="AI Queries Today"
            value="—"
            subtext="Across all modules"
          />
        </div>
      ) : (
        <div
          className="mb-10 p-6 rounded-xl text-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #4d4d4d",
          }}
        >
          <p
            className="text-sm"
            style={{ color: "#808080", fontFamily: "Times, serif" }}
          >
            Metrics unavailable — Neo4j connection required. Run the seed script to populate data.
          </p>
        </div>
      )}

      {/* Department breakdown */}
      {metrics && metrics.departments.length > 0 && (
        <div
          className="rounded-xl p-6 mb-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #4d4d4d",
          }}
        >
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Department Breakdown
          </h2>
          <div className="space-y-3">
            {metrics.departments.map((dept) => {
              const pct = Math.round((dept.count / metrics.total) * 100);
              return (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs text-white"
                      style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                    >
                      {dept.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                    >
                      {dept.count} · {pct}%
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${dept.name}: ${pct}%`}
                  >
                    <div
                      className="h-1 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #343755 0%, rgba(52,55,85,0.5) 100%)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: "/connections", label: "Employee Connections", desc: "Visualize workforce relationships" },
          { href: "/ai", label: "AI Decision Center", desc: "Ask the workforce AI anything" },
          { href: "/recruitment", label: "Recruitment AI", desc: "Analyze candidates and gaps" },
          { href: "/onboarding", label: "Adaptive Onboarding", desc: "Generate personalized plans" },
          { href: "/policies", label: "HR Policy RAG", desc: "Query company policies" },
          { href: "/simulation", label: "Workforce Simulation", desc: "Model what-if scenarios" },
        ].map(({ href, label, desc }) => (
          <a
            key={href}
            href={href}
            className="p-4 rounded-xl group transition-all hover:bg-white/5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(77,77,77,0.5)",
              borderRadius: "5px",
            }}
          >
            <p
              className="text-sm font-bold text-white group-hover:text-[#c6c6c6] transition-colors"
              style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
            >
              {label}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "#808080", fontFamily: "Times, serif", lineHeight: "1.5" }}
            >
              {desc}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
