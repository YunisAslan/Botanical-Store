import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded active:scale-95 font-semibold transition-colors duration-500 disabled:opacity/50",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "bg-primary dark:bg-white dark:text-primary text-white hover:brightness-90 shadow-sm",
        outline:
          "border hover:bg-inputBg dark:hover:bg-slight/70 border-input dark:border-secondary bg-transparent shadow-sm",
        ghost: "bg-transparent hover:bg-inputBg dark:hover:bg-slight/70",
        link: "hover:underline underline-offset-4",
      },
      size: {
        default: "py-2 px-4 text-sm",
        sm: "h-9 px-3 text-sm",
        mm: "px-2 py-2 text-sm",
        icon: "h-9 w-9",
        link: "p-0",
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

Button.displayName = "Button";

export { Button, buttonVariants };
