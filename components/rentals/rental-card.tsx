"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RentalItem } from "@/lib/types/rentals";
import { useQuoteBasket } from "@/lib/context/quote-basket-context";
import { Check, Plus } from "@/components/icons";
import { motion } from "framer-motion";

interface RentalCardProps {
  item: RentalItem;
}

export function RentalCard({ item }: RentalCardProps) {
  const { items, addItem } = useQuoteBasket();
  const isInBasket = items.some((i) => i.id === item.id);

  // Generate SEO-friendly alt text from tags
  const altText = `${item.name} - ${item.tags
    .slice(0, 3)
    .join(", ")} - Event rental equipment`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 bg-gradient-to-b from-card to-card/80 border-border/50">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Popular badge */}
          {item.popular && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-lg backdrop-blur-sm">
              ★ Popular
            </Badge>
          )}

          {/* Category badge */}
          <Badge
            variant="outline"
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border-border/50 text-xs"
          >
            {item.category}
          </Badge>

          {/* Quick add button overlay */}
          <motion.div
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              onClick={() => addItem(item)}
              disabled={isInBasket}
              className={`shadow-lg ${
                isInBasket
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-accent hover:bg-accent/90"
              }`}
            >
              {isInBasket ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </div>

        <CardHeader className="pb-2 pt-4">
          <div className="space-y-1">
            <h3 className="font-semibold leading-tight text-balance line-clamp-2 group-hover:text-accent transition-colors duration-300">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground/70 font-mono">
              {item.sku}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-3">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {item.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs capitalize bg-muted/50 border-border/30 hover:border-accent/50 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-muted/50 border-border/30"
              >
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Specs */}
          <ul className="space-y-1.5 text-sm">
            {item.specs.slice(0, 2).map((spec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent mt-0.5 text-xs">●</span>
                <span className="text-muted-foreground text-xs">{spec}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            onClick={() => addItem(item)}
            disabled={isInBasket}
            className="w-full transition-all duration-300 group/btn"
            variant={isInBasket ? "outline" : "default"}
          >
            {isInBasket ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-green-500">Added to Quote</span>
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                Add to Quote
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
