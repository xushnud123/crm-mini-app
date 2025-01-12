"use client";

import { useState } from "react";
import List from "./_components/list";
import { Product, useProductsStorage } from "@/store/productsStorage";
import CreateProduct from "./_components/add-product";
import { useCategoriesStorage } from "@/store/categoriesStorage";
import EditProduct from "./_components/edit-product";
import { ToastContainer } from "react-toastify";

const Page = ({}) => {
  const [allModal, setAllModal] = useState({
    createModal: false,
    editModal: false,
  });
  const [product, setProduct] = useState<Product | null>(null);
  const { products, removeProduct, addProduct, editProduct } =
    useProductsStorage();
  const { categories } = useCategoriesStorage();

  return (
    <>
      <ToastContainer />
      <EditProduct
        open={allModal.editModal || Boolean(product)}
        categories={categories}
        setOpen={() => {
          setAllModal({ ...allModal, editModal: false });
          setProduct(null);
        }}
        editProduct={editProduct}
        product={product}
      />
      <CreateProduct
        categories={categories}
        open={allModal.createModal}
        setOpen={() =>
          setAllModal({ ...allModal, createModal: !allModal.createModal })
        }
        addProduct={addProduct}
      />
      <div className="block h-screen pt-4 pl-5">
        <div className="flex justify-end">
          <button
            onClick={() =>
              setAllModal({ ...allModal, createModal: !allModal.createModal })
            }
            className=" bg-[#6BE1FF] border border-black px-4 py-2"
          >
            Создать товар +
          </button>
        </div>
        <List
          products={products}
          onProduct={setProduct}
          removeProduct={removeProduct}
        />
      </div>
    </>
  );
};

export default Page;
