"use client";
import { FC } from "react";
import { useProductsStorage } from "@/store/productsStorage";
import { useBasketStorage } from "@/store/useBasketStorage";
import cn from "@/lib/cn";
import { toast, ToastContainer } from "react-toastify";

interface BasketProps {}

const Basket: FC<BasketProps> = ({}) => {
  const { products } = useProductsStorage();
  const { removeFromBasket, basketIds } = useBasketStorage();
  return (
    <div className="h-screen pt-4 pl-5 block">
      <ToastContainer autoClose={1000} />
      <div className="flex justify-end">Корзина ({basketIds.length})</div>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products
          .filter((product) => basketIds.includes(product.productId))
          .map((product) => (
            <div
              key={product.productId}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative p-2">
                <img
                  src={product.photo.imgUrl}
                  alt={product.name}
                  className="w-full rounded-md h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
                  ${100}
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <button
                  onClick={() => {
                    removeFromBasket(product.productId);
                    toast("удалено из корзины", {
                      type: "success",
                    });
                  }}
                  className={cn(
                    "bg-blue-500 text-white cursor-pointer py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-300"
                  )}
                >
                  Удалить с корзины
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Basket;
