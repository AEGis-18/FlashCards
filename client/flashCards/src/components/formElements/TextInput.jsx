import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { useState } from "react";

const labelVariants = cva(
  "border-1 border-solid rounded-md border-slate-300 shadow-md  w-full max-w-96 min-w-48 pl-2 py-1 block ",
  {
    variants: {
      variant: {
        default: "",
        important: "font-bold",
        error: "text-red-300",
      },
      size: {
        default: "text-lg",
        big: "text-xl",
        small: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function TextInput({
  className,
  variant,
  size,
  children,
  id,
  value,
  onChange,
  placeHolder,
  ...props
}) {
  return (
    <>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={twMerge(labelVariants({ variant, className, size }))}
        {...props}
      />
    </>
  );
}
