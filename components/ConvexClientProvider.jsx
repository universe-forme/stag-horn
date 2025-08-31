"use client";

import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export default function ConvexClientProvider({ children }) {
  // Check if Convex environment variables are available
  if (!convexUrl) {
    console.warn("NEXT_PUBLIC_CONVEX_URL is not set. Database features will be disabled.");
    return children;
  }

  const convex = new ConvexReactClient(convexUrl);
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
