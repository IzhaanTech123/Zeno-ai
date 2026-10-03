import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
      <p className="text-text-secondary mb-8">View and manage all registered users.</p>
      
      <div className="bg-surface-elevated border border-border-brand rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-background border-b border-border-brand">
            <tr>
              <th className="px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs">Name</th>
              <th className="px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs">Email</th>
              <th className="px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs">Plan</th>
              <th className="px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs">Role</th>
              <th className="px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-brand">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{user.name || "N/A"}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.plan === "FREE" ? "bg-surface-dark text-text-secondary" : "bg-ai-blue/10 text-ai-blue"}`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">
                  No users found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
