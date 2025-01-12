"use client";
import { RightModal } from "@/app/_components";
import cn from "@/lib/cn";
import { ProductsStorage } from "@/store/productsStorage";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { addProductSchema } from "./schem";
import { CategoriesStorage } from "@/store/categoriesStorage";

import { yupResolver } from "@hookform/resolvers/yup";
import { resizeImage } from "@/lib/calculate";
import { toast } from "react-toastify";

interface CreateProductProps
  extends Pick<ProductsStorage, "addProduct">,
    Pick<CategoriesStorage, "categories"> {
  open: boolean;
  setOpen: () => void;
}

export type FormValues = InferType<typeof addProductSchema>;

const CreateProduct: FC<CreateProductProps> = ({
  open,
  setOpen,
  addProduct,
  categories,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(addProductSchema),
  });
  const [imgUrl, setImgUrl] = useState<ArrayBuffer | string>("");

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

  const onSubmit = async (e: any) => {
    console.log(e);
    const product = {
      ...e,
      category: categories.filter(
        (category) => category.categoryId === e.category
      )[0],
      photo: { imgUrl, name: e.photo[0].name },
    };

    await addProduct(product);
    setOpen();
    reset();
    setImgUrl("");
    toast("успешно добавлено", {
      type: "success",
    });
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
                <option disabled selected>
                  Select Category ...
                </option>
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
              <label htmlFor="photo" className="flex flex-col gap-2">
                Photo
                <input
                  id="photo"
                  type="file"
                  {...register("photo")}
                  accept="image/jpeg,image/png,image/gif"
                />
              </label>
              {imgUrl && (
                <div>
                  <p>Preview:</p>
                  <img
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

export default CreateProduct;
