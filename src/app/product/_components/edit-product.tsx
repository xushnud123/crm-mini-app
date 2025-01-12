"use client";
import { RightModal } from "@/app/_components";
import cn from "@/lib/cn";
import { Product, ProductsStorage } from "@/store/productsStorage";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { updateProductSchema } from "./schema";
import { CategoriesStorage } from "@/store/categoriesStorage";

import { yupResolver } from "@hookform/resolvers/yup";
import { resizeImage } from "@/lib/calculate";
import { toast } from "react-toastify";
import Image from "next/image";

interface EditProductProps
  extends Pick<ProductsStorage, "editProduct">,
    Pick<CategoriesStorage, "categories"> {
  open: boolean;
  setOpen: () => void;
  product: Product | null;
}

export type FormValues = InferType<typeof updateProductSchema>;

const EditProduct: FC<EditProductProps> = ({
  open,
  setOpen,
  categories,
  product,
  editProduct,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(updateProductSchema),
  });
  const [imgUrl, setImgUrl] = useState<ArrayBuffer | string>(
    product?.photo.imgUrl || ""
  );

  const processImage = async (file: File) => {
    try {
      const img = await resizeImage(file, 300, 0.7);
      setImgUrl(img);
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  useEffect(() => {
    // @ts-ignore
    const file: FileList = watch("photo");

    if (file && file.length > 0) {
      processImage(file[0]);
    }
  }, [watch("photo")]);

  useEffect(() => {
    setValue("name", product?.name || "");
    setValue("description", product?.description || "");
    setValue("category", product?.category.categoryId || "");
    setImgUrl(product?.photo.imgUrl as string);
  }, [product]);

  const onSubmit = (e: any) => {
    if (product) {
      const updateProduct = {
        ...e,
        category: categories.filter(
          (category) => category.categoryId === e.category
        )[0],
        photo: {
          imgUrl: imgUrl || product.photo.imgUrl,
          name: e.photo[0]?.name || product.photo.name,
        },
        productId: product.productId,
      };

      editProduct(updateProduct);
      setOpen();
      reset();
      setImgUrl("");
      toast("успешно изменено", {
        type: "success",
      });
    }
  };

  return (
    <>
      <RightModal open={open} closeModal={setOpen}>
        <div>
          <h1>Создание котегория</h1>
          <form
            className="mt-8 w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="flex flex-col gap-2">
                Категория
              </label>
              <select
                {...register("category")}
                name="category"
                id="category"
                className=" border border-black h-11 px-4 rounded-md"
              >
                <option disabled>Select Category ...</option>
                {categories.map((item) => (
                  <option value={item.categoryId} key={item.categoryId}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="flex flex-col gap-2">
                Наименование товара
              </label>
              <input
                {...register("name")}
                className=" border border-black h-11 px-4 rounded-md"
                type="text"
                id="name"
                name="name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="flex flex-col gap-2">
                Описание
              </label>
              <textarea
                {...register("description")}
                className=" border border-black h-20 pt-1 px-4 rounded-md"
                id="description"
                name="description"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="photo"
                  className="cursor-pointer px-3 py-2 border border-black text-blue-500 hover:text-blue-700"
                >
                  Update Image
                </label>
                <input
                  id="photo"
                  type="file"
                  {...register("photo")}
                  accept="image/jpeg,image/png,image/gif"
                  style={{ display: "none" }}
                />
              </div>
              {imgUrl && (
                <div className="mt-2">
                  <p>Preview: {product?.photo.name}</p>
                  <Image
                    src={typeof imgUrl === "string" ? imgUrl : ""}
                    alt="Preview"
                    style={{
                      width: "50px",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}

              {errors.photo && (
                <p className="text-red-500">{errors.photo.message}</p>
              )}
            </div>
            <button
              type="submit"
              className={cn(
                "bg-[#97FF8F] px-4 py-2 border border-black rounded-md hover:bg-[#97FF8F]/80 disabled:bg-[#97FF8F]/50 disabled:cursor-not-allowed"
              )}
            >
              Соxранить{" "}
            </button>
          </form>
        </div>
      </RightModal>
    </>
  );
};

export default EditProduct;
