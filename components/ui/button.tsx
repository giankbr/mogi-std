import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_6px_0_0_rgba(0,0,0,0.15)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)] border-b-[3px] border-black/20',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 shadow-[0_6px_0_0_rgba(0,0,0,0.15)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)] border-b-[3px] border-black/20',
        outline:
          'border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 shadow-[0_6px_0_0_rgba(0,0,0,0.08)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.08)] border-b-[3px] border-black/10',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_6px_0_0_rgba(0,0,0,0.12)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.12)] border-b-[3px] border-black/15',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 shadow-none hover:shadow-[0_4px_0_0_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:shadow-none',
        link: 'text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none active:shadow-none',
      },
      size: {
        default: 'h-10 px-5 py-2.5 has-[>svg]:px-4',
        sm: 'h-9 rounded-lg gap-1.5 px-4 has-[>svg]:px-3',
        lg: 'h-12 rounded-lg px-7 has-[>svg]:px-5',
        icon: 'size-10',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
