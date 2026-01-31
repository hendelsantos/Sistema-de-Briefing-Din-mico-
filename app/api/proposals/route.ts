import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { submissionId, price, deadline, scope } = body;

    // Check if proposal already exists
    const existing = await (prisma as any).proposal.findUnique({
      where: { submissionId },
    });

    if (existing) {
      // Update existing
      const updated = await (prisma as any).proposal.update({
        where: { id: existing.id },
        data: {
          price,
          deadline,
          scope,
          status: "DRAFT",
        },
      });
      return NextResponse.json(updated);
    }

    // Create new
    const proposal = await (prisma as any).proposal.create({
      data: {
        submissionId,
        price,
        deadline,
        scope,
        status: "DRAFT",
      },
    });

    return NextResponse.json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { error: "Failed to create proposal" },
      { status: 500 }
    );
  }
}
