"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RentalItem } from "@/lib/types/rentals"
import { useQuoteBasket } from "@/lib/context/quote-basket-context"
import { Check } from "@/components/icons"

interface RentalCardCompactProps {
  item: RentalItem
}

export function RentalCardCompact({ item }: RentalCardCompactProps) {
  const { items, addItem } = useQuoteBasket()
  const isInBasket = items.some((i) => i.id === item.id)

  return (
    <div className="group flex gap-4 p-4 bg-card border rounded-lg transition-all hover:shadow-md hover:border-accent/50">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded bg-muted">
        <Image src={item.thumbnail || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight truncate">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.sku}</p>
          </div>
          {item.popular && (
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              Popular
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.shortDescription}</p>

        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <Button
          onClick={() => addItem(item)}
          disabled={isInBasket}
          size="sm"
          variant={isInBasket ? "outline" : "default"}
        >
          {isInBasket ? <Check className="h-4 w-4" /> : "Add to Quote"}
        </Button>
      </div>
    </div>
  )
}
