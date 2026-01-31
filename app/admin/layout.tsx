import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {children}
      <footer className="bg-gray-50 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        Feito por HendelCode
      </footer>
    </>
  );
}
