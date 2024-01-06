import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/cosmic/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-red-400 to-orange-600 text-white hover:bg-primary/90 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.3)] border border-orange-600 hover:opacity-90",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/75 border border-zinc-200/75 dark:bg-gradient-to-b dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80 dark:border-zinc-700 dark:shadow-white/10 hover:opacity-80 transition-all ease-in-out duration-150 shadow-[inset_0_1px_1px_0_rgb(255_255_255_/_0.9)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_0_rgba(0,0,0,0.8)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-zinc-200 dark:border-zinc-700 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
