import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ReactNode, ComponentType, SVGProps } from "react"

interface CtaButtonProps {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  iconPosition?: "left" | "right"
  size?: "default" | "lg" | "sm"
  className?: string
}

export function CtaButton({
  href,
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  size = "default",
  className,
}: CtaButtonProps) {
  const variantStyles = {
    primary: "bg-accent text-accent-foreground hover:bg-accent/90",
    secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border-2 border-accent text-accent-foreground hover:bg-accent",
  }

  return (
    <Button asChild size={size} className={`${variantStyles[variant]} ${className}`}>
      <Link href={href}>
        {Icon && iconPosition === "left" && <Icon className="mr-2 h-4 w-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="ml-2 h-4 w-4" />}
      </Link>
    </Button>
  )
}
