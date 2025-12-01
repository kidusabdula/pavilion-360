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
    primary: "bg-black text-yellow-400 hover:bg-black/90 hover:text-yellow-300",
    secondary: "bg-black text-yellow-400 hover:bg-black/90 hover:text-yellow-300",
    outline: "border-2 border-black text-yellow-400 hover:bg-black hover:text-yellow-300",
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
