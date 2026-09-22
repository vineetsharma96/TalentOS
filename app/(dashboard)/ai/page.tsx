import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { AIDecisionCenterClient } from "@/components/ai/AIDecisionCenterClient";
import { processAIQuery } from "@/lib/ai-engine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Decision Center",
};

export default async function AIDecisionPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!hasPermission(session.user.role, "USE_AI")) {
    redirect("/unauthorized");
  }

  // Pre-seed with top strategic flight risk query for immediate wow factor
  let initialResponse = null;
  try {
    initialResponse = await processAIQuery("Who are the top flight risks in Engineering and what are the intervention recommendations?");
  } catch (err) {
    console.warn("[AIDecisionPage] Failed to pre-generate initial query:", err);
  }

  return (
    <div className="p-8">
      <AIDecisionCenterClient initialResponse={initialResponse} />
    </div>
  );
}
