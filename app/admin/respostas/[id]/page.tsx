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
        include: { proposal: true },
      },
    },
  }) as any;

  if (!form) {
    notFound();
  }

  const serializedForm = {
    ...form,
    submissions: form.submissions.map((submission) => ({
      ...submission,
          proposal: submission.proposal
        ? {
            ...submission.proposal,
            price: Number(submission.proposal.price),
            deadline: submission.proposal.deadline || "",
            status: submission.proposal.status,
          }
        : undefined,
    })),
  };

  return <SubmissionsClient form={serializedForm} />;
}
