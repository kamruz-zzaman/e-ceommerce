"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";

interface CartDrawerContextValue {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  return (
    <CartDrawerContext.Provider value={{ open, openDrawer, closeDrawer }}>
      {children}
      <CartDrawer open={open} onClose={closeDrawer} />
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);
  if (!context)
    throw new Error("useCartDrawer must be used within CartDrawerProvider");
  return context;
}
