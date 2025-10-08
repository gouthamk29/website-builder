"use client";

import { useEffect, useState } from "react";
import type { UserType } from "@/types";

export function useUser() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (mounted) setUser(data);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false };
  }, []);

  return { user, loading };
}
