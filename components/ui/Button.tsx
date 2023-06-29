import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded active:scale-95 font-medium transition-colors duration-500 shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-white hover:brightness-110",
        outline: "border hover:bg-inputBg border-input bg-transparent",
        ghost: "bg-transparent",
        link: "",
      },
      size: {
        default: "h-10 w-28 py-2 px-4 text-lg",
        sm: "h-9 px-3 text-sm",
        mm: "px-2 py-1",
        icon: "h-9 w-9",
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
