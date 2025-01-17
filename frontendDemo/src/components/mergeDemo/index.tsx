import * as React from "react"

import { cn } from "./mergeUtils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"


const MergeDemo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Transfer Transaction Example</CardTitle>
            <CardDescription>
              Transfer SUI to another account. This transaction is not
              sponsored by the app.
            </CardDescription>
        </CardHeader>
      </Card>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Transfer Transaction Example</CardTitle>
            <CardDescription>
              Transfer SUI to another account. This transaction is not
              sponsored by the app.
            </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default MergeDemo