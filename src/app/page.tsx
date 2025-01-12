"use client";
import cn from "@/lib/cn";
import { useProductsStorage } from "@/store/productsStorage";
import { useBasketStorage } from "@/store/useBasketStorage";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const { products } = useProductsStorage();
  const { addToBasket, basketIds } = useBasketStorage();

  return (
    <div className="h-screen pt-4 pl-5 block">
      <ToastContainer autoClose={1000} />
      <div className="flex justify-end">Корзина ({basketIds.length})</div>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.productId}
            className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative p-2">
              <Image
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
                  addToBasket(product.productId);
                  toast("в корзину", {
                    type: "success",
                  });
                }}
                disabled={basketIds.includes(product.productId)}
                className={cn(
                  "bg-blue-500 text-white cursor-pointer py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-300",
                  basketIds.includes(product.productId) &&
                    "bg-blue-300 cursor-not-allowed"
                )}
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
