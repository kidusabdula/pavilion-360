"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { useQuoteBasket } from "@/lib/context/quote-basket-context"
import Image from "next/image"
import { X } from "@/components/icons"
import Link from "next/link"

interface QuoteBasketSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteBasketSheet({ isOpen, onOpenChange }: QuoteBasketSheetProps) {
  const { items, removeItem, clearBasket, itemCount } = useQuoteBasket()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Quote Basket ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4 flex-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your quote basket is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <Image src={item.thumbnail || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.sku}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="mt-6 flex-col gap-2">
          {items.length > 0 && (
            <>
              <Button variant="outline" onClick={clearBasket} className="w-full bg-transparent">
                Clear Basket
              </Button>
              <Button asChild className="w-full">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
