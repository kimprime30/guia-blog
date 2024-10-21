import Sidebar from "../components/Sidebar";
import { getServerSession } from "next-auth"; // Autenticação
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Configurações de autenticação
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return redirect("/auth/login");
  }

  return (
    <div className="flex">
      <div className="flex ">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
