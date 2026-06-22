/* PREMA ENGINEERING WORKS — Client Authentication Bridge Hook */

'use client';

import { useSession, signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";

export function useAuth() {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const user = session?.user
    ? {
        id: (session.user as any).id as string,
        name: session.user.name || "",
        email: session.user.email || "",
        role: (session.user as any).role as UserRole,
      }
    : null;

  const isAuthenticated = !!session?.user;

  const logout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return {
    user,
    loading,
    error: null,
    isAuthenticated,
    logout,
  };
}

export default useAuth;
