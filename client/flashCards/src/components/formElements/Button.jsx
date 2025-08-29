import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const labelVariants = cva(
  "px-3 py-1 border rounded-md text-white mt-2 mb-1 font-semibold cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-blue-500 bg-blue-500 text-blue-100",
        cancel: "border-red-500 bg-red-500 text-red-100",
        accept: "border-green-500 bg-green-500 text-green-100",
      },
      size: {
        default: "text-2xl",
        big: "text-3xl",
        small: "text-xl",
        very_small: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, children, ...props }) {
  return (
    <>
      <button
        {...props}
        className={twMerge(labelVariants({ variant, className, size }))}
      >
        {children}
      </button>
    </>
  );
}
