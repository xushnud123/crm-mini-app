"use client";
import { useState } from "react";
import CreateCategories from "./_components/create-categories";
import List from "./_components/list";
import EditCategories from "./_components/edit-categories";
import { Categories, useCategoriesStorage } from "@/store/categoriesStorage";

const Page = ({}) => {
  const [allModal, setAllModal] = useState({
    createModal: false,
    editModal: false,
  });
  const [category, setCategory] = useState<Categories | null>(null);
  const { categories, addCategory, editCategory, removeCategory } =
    useCategoriesStorage();

  return (
    <>
      <CreateCategories
        open={allModal.createModal}
        setOpen={() =>
          setAllModal({ ...allModal, createModal: !allModal.createModal })
        }
        addCategory={addCategory}
        categories={categories}
      />
      <EditCategories
        open={allModal.editModal || Boolean(category)}
        onClose={() => {
          setAllModal({ ...allModal, editModal: false });
          setCategory(null);
        }}
        category={category}
        editCategory={editCategory}
      />
      <div className="block h-screen pt-4 pl-5">
        <div className="flex justify-end">
          <button
            onClick={() =>
              setAllModal({ ...allModal, createModal: !allModal.createModal })
            }
            className=" bg-[#6BE1FF] border border-black px-4 py-2"
          >
            Создать категорию +
          </button>
        </div>
        <List
          categories={categories}
          onCategory={setCategory}
          removeCategory={removeCategory}
        />
      </div>
    </>
  );
};

export default Page;
