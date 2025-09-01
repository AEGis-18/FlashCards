import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";

const labelVariants = cva(
  "border-1 border-solid rounded-md border-slate-300 shadow-md max-w-96 min-w-48 w-full flex",
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

export function PasswordInput({
  className,
  variant,
  size,
  id,
  value,
  onChange,
  ...props
}) {
  // const [password, setPassword] = useState("");
  const [showing, setShowing] = useState(false);

  return (
    <div className={twMerge(labelVariants({ variant, className, size }))}>
      <input
        type={showing ? "text" : "password"}
        id={id}
        value={value}
        name={id}
        onChange={onChange}
        placeholder="Enter your password"
        required
        className="w-full pl-2 py-1 border rounded-l-md border-white"
        {...props}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowing(!showing);
        }}
        className="border-l-1 flex-none border-slate-300 w-fit cursor-pointer p-1"
      >
        {showing ? "*_*" : ">_<"}
      </button>
    </div>
  );
}
