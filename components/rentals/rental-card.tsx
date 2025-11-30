"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RentalItem } from "@/lib/types/rentals"
import { useQuoteBasket } from "@/lib/context/quote-basket-context"
import { Check } from "@/components/icons"

interface RentalCardProps {
  item: RentalItem
}

export function RentalCard({ item }: RentalCardProps) {
  const { items, addItem } = useQuoteBasket()
  const isInBasket = items.some((i) => i.id === item.id)

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={item.thumbnail || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {item.popular && <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">Popular</Badge>}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight text-balance">{item.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.sku}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{item.shortDescription}</p>

        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <ul className="space-y-1 text-sm">
          {item.specs.slice(0, 3).map((spec, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span className="text-muted-foreground">{spec}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => addItem(item)}
          disabled={isInBasket}
          className="w-full"
          variant={isInBasket ? "outline" : "default"}
        >
          {isInBasket ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Quote
            </>
          ) : (
            "Add to Quote"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
