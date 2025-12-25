"use client";

import { Button } from "@/components/ui/button";
import { useQuoteBasket } from "@/lib/context/quote-basket-context";
import { Check, Plus } from "@/components/icons";
import type { RentalItem } from "@/lib/types/rentals";

interface RentalDetailClientProps {
  item: RentalItem;
}

export function RentalDetailClient({ item }: RentalDetailClientProps) {
  const { items, addItem } = useQuoteBasket();
  const isInBasket = items.some((i) => i.id === item.id);

  return (
    <div className="pt-4 border-t border-border">
      <Button
        onClick={() => addItem(item)}
        disabled={isInBasket}
        size="lg"
        className="w-full text-base transition-all duration-300 group/btn"
        variant={isInBasket ? "outline" : "default"}
      >
        {isInBasket ? (
          <>
            <Check className="mr-2 h-5 w-5 text-green-500" />
            <span className="text-green-500">Added to Quote</span>
          </>
        ) : (
          <>
            <Plus className="mr-2 h-5 w-5 group-hover/btn:rotate-90 transition-transform duration-300" />
            Add to Quote Request
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Add items to your quote basket and submit a request for pricing
      </p>
    </div>
  );
}
