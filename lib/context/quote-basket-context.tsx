"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { RentalItem } from "@/lib/types/rentals"

interface QuoteBasketContextType {
  items: RentalItem[]
  addItem: (item: RentalItem) => void
  removeItem: (itemId: string) => void
  clearBasket: () => void
  itemCount: number
}

const QuoteBasketContext = createContext<QuoteBasketContextType | undefined>(undefined)

export function QuoteBasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RentalItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pavilion360-quote-basket")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse quote basket from localStorage", e)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("pavilion360-quote-basket", JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addItem = (item: RentalItem) => {
    setItems((prev) => {
      // Prevent duplicates
      if (prev.find((i) => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const clearBasket = () => {
    setItems([])
  }

  return (
    <QuoteBasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearBasket,
        itemCount: items.length,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  )
}

export function useQuoteBasket() {
  const context = useContext(QuoteBasketContext)
  if (context === undefined) {
    throw new Error("useQuoteBasket must be used within a QuoteBasketProvider")
  }
  return context
}
