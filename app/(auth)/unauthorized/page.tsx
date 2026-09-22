import { ErrorPage } from "@/components/errors/ErrorPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Denied",
};

export default function UnauthorizedPage() {
  return <ErrorPage code="ERR_FORBIDDEN" httpStatus={403} />;
}
