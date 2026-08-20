"use client";

import { useEffect } from "react";

export function AdminSessionRefresh() {
  useEffect(() => {
    const refresh = () => void fetch("/admin/auth/refresh", { credentials: "same-origin" });
    refresh();
    const interval = window.setInterval(refresh, 30 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);
  return null;
}
