import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkProviderWrapper({ children }) {
  // Check if Clerk environment variables are available
  const hasClerkConfig = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY;
  
  if (!hasClerkConfig) {
    // Return children without ClerkProvider if environment variables are missing
    console.warn("Clerk environment variables not found. Authentication features will be disabled.");
    return children;
  }
  
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
