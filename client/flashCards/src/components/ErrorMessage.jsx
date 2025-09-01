import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const labelVariants = cva("text-red-500", {
  variants: {
    variant: {
      default: "",
      bold: "font-bold",
    },
    size: {
      default: "",
      big: "text-xl",
      small: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export function ErrorMessage({ className, variant, size, children, ...props }) {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((error, index) => (
          <p
            key={index}
            {...props}
            className={twMerge(labelVariants({ variant, className, size }))}
          >
            {error}
          </p>
        ))}
      </>
    );
  }

  return (
    <p
      {...props}
      className={twMerge(labelVariants({ variant, className, size }))}
    >
      {children}
    </p>
  );

}
