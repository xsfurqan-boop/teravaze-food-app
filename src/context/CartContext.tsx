"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('teravaze-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('teravaze-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === newItem.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const decreaseQuantity = (id: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === id);
            if (existing && existing.quantity > 1) {
                return prev.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            // If quantity is 1, remove it
            return prev.filter((i) => i.id !== id);
        });
    };

    const clearCart = () => setItems([]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isMenuOpen,
            toggleMenu,
            closeMenu
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
