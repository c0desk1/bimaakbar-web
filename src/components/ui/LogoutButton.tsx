"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
