import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const labelVariants = cva(
  "border-1 border-solid rounded-md p-4 border-slate-300 shadow-md block min-w-48 w-fit",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Box({ className, variant, size, children, ...props }) {
  return (
    <div className={twMerge(labelVariants({ variant, className, size }))}>
      {children}
    </div>
  );
}
