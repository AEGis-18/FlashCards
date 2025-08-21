import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

//TODO check variants and sizes
const labelVariants = cva(
  "px-3 py-1 border rounded-md text-white mt-2 mb-1 font-semibold",
  {
    variants: {
      variant: {
        default: "border-blue-500 bg-blue-500 text-blue-100",
        cancel: "border-red-500 bg-red-500 text-red-100",
        add: "border-green-500 bg-green-500 text-green-100",
      },
      size: {
        default: "text-2xl",
        big: "text-3xl",
        small: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function FormTitle({ className, variant, size, children, ...props }) {
  return (
    <>
      <h1
        {...props}
        className={twMerge(labelVariants({ variant, className, size }))}
      >
        {children}
      </h1>
    </>
  );
}
