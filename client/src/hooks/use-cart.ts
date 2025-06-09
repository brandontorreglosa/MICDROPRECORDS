import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ReleaseWithArtist, Cart } from "@shared/schema";

interface CartItem {
  release: ReleaseWithArtist;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (release: ReleaseWithArtist, quantity?: number) => void;
  removeFromCart: (releaseId: number) => void;
  updateQuantity: (releaseId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate a session ID for the cart
const getSessionId = () => {
  let sessionId = localStorage.getItem("cart_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("cart_session_id", sessionId);
  }
  return sessionId;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(getSessionId);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch cart items
  const { data: cartData = [], isLoading } = useQuery<(Cart & { release: ReleaseWithArtist })[]>({
    queryKey: [`/api/cart/${sessionId}`],
  });

  // Convert API data to cart items
  const items: CartItem[] = cartData.map(item => ({
    release: item.release,
    quantity: item.quantity || 1,
  }));

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ releaseId, quantity = 1 }: { releaseId: number; quantity?: number }) => {
      const response = await apiRequest("POST", "/api/cart", {
        sessionId,
        releaseId,
        quantity,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${sessionId}`] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (releaseId: number) => {
      await apiRequest("DELETE", `/api/cart/${sessionId}/${releaseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${sessionId}`] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/cart/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${sessionId}`] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToCart = (release: ReleaseWithArtist, quantity = 1) => {
    addToCartMutation.mutate({ releaseId: release.id, quantity });
  };

  const removeFromCart = (releaseId: number) => {
    removeFromCartMutation.mutate(releaseId);
  };

  const updateQuantity = (releaseId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(releaseId);
    } else {
      // Find current item and calculate the difference
      const currentItem = items.find(item => item.release.id === releaseId);
      if (currentItem) {
        const diff = quantity - currentItem.quantity;
        if (diff > 0) {
          addToCartMutation.mutate({ releaseId, quantity: diff });
        } else if (diff < 0) {
          // For reducing quantity, we need to remove the item and add it back with new quantity
          removeFromCartMutation.mutate(releaseId, {
            onSuccess: () => {
              if (quantity > 0) {
                addToCartMutation.mutate({ releaseId, quantity });
              }
            },
          });
        }
      }
    }
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (parseFloat(item.release.price) * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoading: isLoading || addToCartMutation.isPending || removeFromCartMutation.isPending,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
