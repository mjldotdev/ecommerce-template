"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { Product } from "@/lib/data";

const STORAGE_KEY = "maison_cart";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
  size: string | null;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; size: string | null }
  | { type: "REMOVE_ITEM"; productId: string; size: string | null }
  | {
      type: "UPDATE_QTY";
      productId: string;
      size: string | null;
      quantity: number;
    }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = `${action.product.id}-${action.size}`;
      const existing = state.items.find(
        (i) => `${i.product.id}-${i.size}` === key
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            `${i.product.id}-${i.size}` === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, size: action.size },
        ],
      };
    }
    case "REMOVE_ITEM": {
      const key = `${action.productId}-${action.size}`;
      return {
        ...state,
        items: state.items.filter((i) => `${i.product.id}-${i.size}` !== key),
      };
    }
    case "UPDATE_QTY": {
      const key = `${action.productId}-${action.size}`;
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => `${i.product.id}-${i.size}` !== key),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          `${i.product.id}-${i.size}` === key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  addItem: (product: Product, size?: string | null) => void;
  clearCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  itemCount: number;
  items: CartItem[];
  openCart: () => void;
  removeItem: (productId: string, size?: string | null) => void;
  subtotal: number;
  toggleCart: () => void;
  updateQty: (productId: string, size: string | null, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // ── Hydrate from localStorage on first mount ──────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        // Re-dispatch each stored item so the reducer handles deduplication correctly
        for (const item of parsed) {
          for (let i = 0; i < item.quantity; i++) {
            dispatch({
              type: "ADD_ITEM",
              product: item.product,
              size: item.size,
            });
          }
        }
      }
    } catch {
      // Ignore malformed storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  // ── Persist items to localStorage on every change ────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  }, [state.items]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const addItem = useCallback(
    (product: Product, size: string | null = null) =>
      dispatch({ type: "ADD_ITEM", product, size }),
    []
  );
  const removeItem = useCallback(
    (productId: string, size: string | null = null) =>
      dispatch({ type: "REMOVE_ITEM", productId, size }),
    []
  );
  const updateQty = useCallback(
    (productId: string, size: string | null, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", productId, size, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
