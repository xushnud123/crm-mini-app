"use client";
import { RightModal } from "@/app/_components";
import cn from "@/lib/cn";
import { Categories, CategoriesStorage } from "@/store/categoriesStorage";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface CreateCategoriesProps
  extends Pick<CategoriesStorage, "editCategory"> {
  open: boolean;
  onClose: () => void;
  category?: Categories | null;
}

const EditCategories: FC<CreateCategoriesProps> = ({
  open,
  onClose,
  editCategory,
  category,
}) => {
  const [name, setName] = useState(category?.name);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && category?.categoryId) {
      editCategory({
        name,
        categoryId: category?.categoryId,
      });
      onClose();
      toast("успешно изменено", {
        type: "success",
      });
    }
  };
  return (
    <>
      <RightModal open={open} closeModal={() => onClose()}>
        <div>
          <h1>Создание котегория</h1>
          <form className="mt-8 w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <label htmlFor="name" className="flex flex-col gap-2">
              Наименование категории
              <input
                className=" border border-black h-11 px-4 rounded-md"
                type="text"
                id="name"
                defaultValue={category?.name}
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

export default EditCategories;
