import { Product } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface ProductStore {
  products: CartProduct[];
  totalPrice: number;
  totalQuantity: number;
  addToBasket: (payload: Product) => void;
  removeItem: (payload: Product) => void;
  calculateTotalItems: () => void;
  increaseItems: (payload: Product) => void;
  decreaseItems: (payload: Product) => void;
}

interface CartProduct extends Product {
  quantity: number;
}

export const useProductStore = create(
  persist(
    immer<ProductStore>((set) => ({
      products: [],
      totalQuantity: 0,
      totalPrice: 0,
      addToBasket: (payload) =>
        set((state) => {
          const find = state.products.findIndex(
            (product) => product.id === payload.id
          );

          if (find !== -1) {
            state.products[find].quantity += 1;
          } else {
            const newItem = { ...payload, quantity: 1 };
            state.products.push(newItem);
          }
        }),

      removeItem: (payload) =>
        set((state) => {
          const productIndex = state.products.findIndex(
            (product) => product.id === payload.id
          );

          if (productIndex !== -1) {
            //   state.totalQuantity -= state.products[productIndex].quantity;
            state.products.splice(productIndex, 1);
          }
        }),

      calculateTotalItems: () =>
        set((state) => {
          const { totalPrice, totalQuantity } = state.products.reduce(
            (totalValueAcc, currValue) => {
              const { plant_price, quantity } = currValue;
              const totalValue = plant_price * quantity;
              totalValueAcc.totalQuantity += quantity;
              totalValueAcc.totalPrice += totalValue;
              return totalValueAcc;
            },
            {
              totalQuantity: 0,
              totalPrice: 0,
            }
          );

          state.totalQuantity = totalQuantity;
          state.totalPrice = Number(totalPrice.toFixed(2)); // Convert totalPrice to a string with 2 decimal places
        }),
      increaseItems: (payload) =>
        set((state) => {
          state.products = state.products.map((item) => {
            if (item.id === payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }

            return item;
          });
        }),
      decreaseItems: (payload) =>
        set((state) => {
          state.products = state.products.map((item) => {
            if (item.id === payload.id) {
              return { ...item, quantity: item.quantity - 1 };
            }

            return item;
          });
        }),
    })),
    { name: "Products" }
  )
);
