import { auth } from "@/lib/auth";
import { errorResponse } from "@/lib/error-normalizer";
import { ErrorCode } from "@/types/errors";
import { processAIQuery } from "@/lib/ai-engine";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return errorResponse(ErrorCode.UNAUTHORIZED, 401);
  }

  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse(ErrorCode.VALIDATION, 400);
  }

  if (!body.query || typeof body.query !== "string" || body.query.trim().length === 0) {
    return errorResponse(ErrorCode.VALIDATION, 400);
  }

  try {
    const result = await processAIQuery(body.query.trim());
    return NextResponse.json(result);
  } catch (err) {
    console.error("[API] /api/ai/query error:", err);
    return errorResponse(ErrorCode.AI_UNAVAILABLE, 500);
  }
}
