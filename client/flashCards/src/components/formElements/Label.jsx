import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const labelVariants = cva("text-3xl font-bold text-start", {
  variants: {
    variant: {
      default: "bold",
      important: "bg-red-500 text-white",
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
});

export function Label({ className, variant, size, children, ...props }) {
  return (
    <div className="block text-left mb-1 mt-2">
      <label className={twMerge(labelVariants({ variant, className, size }))}>
        {children}
      </label>
    </div>
  );
}
