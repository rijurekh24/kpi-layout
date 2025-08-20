import LayoutPageClient from "./LayoutPageClient";
import { Layout } from "@/components/layouts/LayoutBuilder";
import { notFound } from "next/navigation";

export default async function LayoutPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/store/layout/${id}`);

  if (!res.ok) return notFound();

  const layoutData: Layout = await res.json();

  return <LayoutPageClient layoutData={layoutData} />;
}
