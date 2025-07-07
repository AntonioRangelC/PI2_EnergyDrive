import * as React from "react";
import * as Primitive from "@radix-ui/react-primitive";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; 
  id: string; 
}

const Input = React.forwardRef<
    HTMLInputElement,
    InputProps
>(({ label, id, className, ...props }, ref) => (
  
  <div className="flex flex-col space-y-2">
    <label
      htmlFor={id}
      className="text-sm font-medium text-gray-700"
    >
      {label}
    </label>

    <input
        ref={ref}
        className={cn(
        "w-full px-4 py-2 text-sm bg-[#D9D9D9] invalid:border-customRed border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
        className
        )}
        {...props}
    />
  </div>
));
Input.displayName = "input"

export { Input }