"use client";
import { RightModal } from "@/app/_components";
import cn from "@/lib/cn";
import { CategoriesStorage } from "@/store/categoriesStorage";
import { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface CreateCategoriesProps
  extends Pick<CategoriesStorage, "categories" | "addCategory"> {
  open: boolean;
  setOpen: () => void;
}

const CreateCategories: FC<CreateCategoriesProps> = ({
  open,
  setOpen,
  addCategory,
}) => {
  const [name, setName] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addCategory(name);
    setOpen();
    setName("");
    toast("успешно добавлено", {
      type: "success",
    });
  };

  return (
    <>
      <ToastContainer />
      <RightModal open={open} closeModal={setOpen}>
        <div>
          <h1>Создание котегория</h1>

          <form className="mt-8 w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <label htmlFor="name" className="flex flex-col gap-2">
              Наименование категории
              <input
                className=" border border-black h-11 px-4 rounded-md"
                type="text"
                id="name"
                placeholder="Введите наименование категории"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button
              disabled={!name}
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

export default CreateCategories;
