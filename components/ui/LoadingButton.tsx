import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Icons } from "../Icons";

const buttonVariants = cva(
  "flex items-center justify-center rounded active:scale-95 font-medium transition-colors duration-500 disabled:cursor-not-allowed disable:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-white hover:brightness-110 shadow-sm",
        outline:
          "border hover:bg-inputBg border-input bg-transparent shadow-sm",
        ghost: "bg-transparent hover:bg-inputBg",
        link: "hover:underline underline-offset-4",
      },
      size: {
        default: "py-2 px-4 text-lg",
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

const LoadingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, size, variant, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <button
        disabled={pending}
        ref={ref}
        className={cn(buttonVariants({ className, variant, size }))}
        {...props}
      >
        {pending && <Icons.shovel className="animate-bounce w-5 h-5" />}
        {!pending && children}
      </button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton, buttonVariants };