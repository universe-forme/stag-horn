"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#C0C0C0] bg-white px-3 py-2 text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C] opacity-60 focus:outline-none focus:ring-2 focus:ring-[#D6AF66] focus:border-[#D6AF66] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
