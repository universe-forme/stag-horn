"use client";

import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({ children }) {
  const { getToken } = useAuth();
  
  return (
    <ConvexProviderWithAuth 
      client={convex}
      useAuth={() => ({
        getToken: async () => {
          return await getToken({ template: "convex" });
        },
      })}
    >
      {children}
    </ConvexProviderWithAuth>
  );
}
