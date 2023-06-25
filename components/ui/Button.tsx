import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

const buttonVariants = cva(
  "text-white bg-red-600 hover:scale-95 items-center flex",
  {
    variants: {
      variant: {
        default: "bg-slate-900",
        outline: "border border-blue-600 bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {}

type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, size, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ className, variant, size }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
export { Button, buttonVariants };
