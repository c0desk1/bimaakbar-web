import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="relative border-x border-[var(--border)]">
      <h1>Dashboard Admin</h1>
      <p>Selamat datang, {session.user?.name}</p>
      <LogoutButton />
    </main>
  );
}
