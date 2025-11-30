"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "@/components/icons"
import { useQuoteBasket } from "@/lib/context/quote-basket-context"
import { useState } from "react"
import { QuoteBasketSheet } from "./quote-basket-sheet"

export function QuoteBasket() {
  const { itemCount } = useQuoteBasket()
  const [isOpen, setIsOpen] = useState(false)

  if (itemCount === 0) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="shadow-lg h-14 px-6"
          aria-label={`Open quote basket with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Quote Basket ({itemCount})
        </Button>
      </div>

      <QuoteBasketSheet isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
