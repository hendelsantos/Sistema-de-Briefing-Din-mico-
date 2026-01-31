import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SubmissionsClient } from "./SubmissionsClient";

export default async function RespostasPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const form = await prisma.form.findUnique({
    where: { id: params.id },
    include: {
      submissions: {
        orderBy: { submittedAt: "desc" },
      },
    },
  });

  if (!form) {
    notFound();
  }

  return <SubmissionsClient form={form} />;
}
