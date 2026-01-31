import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FormClient } from "./FormClient";

export default async function BriefingPublicoPage({
  params,
}: {
  params: { slug: string };
}) {
  const form = await prisma.form.findUnique({
    where: { slug: params.slug },
  });

  if (!form) {
    notFound();
  }

  return <FormClient form={form} />;
}
