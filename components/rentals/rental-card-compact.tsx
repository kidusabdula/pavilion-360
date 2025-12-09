"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { RentalItem } from "@/lib/types/rentals";
import { useQuoteBasket } from "@/lib/context/quote-basket-context";
import { Check, Plus } from "@/components/icons";
import { motion } from "framer-motion";

interface RentalCardCompactProps {
  item: RentalItem;
}

export function RentalCardCompact({ item }: RentalCardCompactProps) {
  const { items, addItem } = useQuoteBasket();
  const isInBasket = items.some((i) => i.id === item.id);

  // Generate SEO-friendly alt text from tags
  const altText = `${item.name} - ${item.tags
    .slice(0, 3)
    .join(", ")} - Event rental equipment`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 4 }}
      className="group flex gap-4 p-4 bg-gradient-to-r from-card to-card/80 border border-border/50 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30"
    >
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={item.thumbnail || "/placeholder.svg"}
          alt={altText}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category indicator */}
        <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-background/90 to-transparent">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            {item.category.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight truncate group-hover:text-accent transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground/60 font-mono">
                {item.sku}
              </p>
            </div>
            {item.popular && (
              <Badge className="text-[10px] px-1.5 py-0.5 flex-shrink-0 bg-accent/10 text-accent border-accent/20">
                ★ Popular
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
            {item.shortDescription}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[10px] capitalize bg-muted/30 border-border/30 py-0"
            >
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <span className="text-[10px] text-muted-foreground">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center flex-shrink-0">
        <Button
          onClick={() => addItem(item)}
          disabled={isInBasket}
          size="sm"
          variant={isInBasket ? "outline" : "default"}
          className="transition-all duration-300 min-w-[100px]"
        >
          {isInBasket ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />
              <span className="text-green-500 text-xs">Added</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Add</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
