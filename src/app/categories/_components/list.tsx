import { Edit, Remove } from "@/app/_components/icons";
import { Categories, CategoriesStorage } from "@/store/categoriesStorage";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "react-toastify";

interface ListProps
  extends Pick<CategoriesStorage, "removeCategory" | "categories"> {
  onCategory: Dispatch<SetStateAction<Categories | null>>;
}

const List: FC<ListProps> = ({ categories, onCategory, removeCategory }) => {
  return (
    <div className="mt-5">
      <h2>Созданные Категории </h2>
      <div className="mt-3 border border-black">
        <div className="bg-[#CCEAFF] flex px-6 py-2">
          <div className="w-[120px]">№</div>
          <div>Наименование</div>
        </div>
        <div>
          {categories.length !== 0 ? (
            <>
              {categories.map(({ name, categoryId }: Categories, idx) => (
                <div
                  key={categoryId}
                  className="flex px-6 hover:bg-slate-100 justify-between py-2 items-center border-t border-black"
                >
                  <div className="flex ">
                    <div className="w-[120px]">{idx + 1}</div>
                    <div>{name}</div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => onCategory({ name, categoryId })}
                      className="bg-[#6BE1FF] border border-black px-4 py-2"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => {
                        removeCategory(categoryId);
                        toast("успешно удалено", {
                          type: "success",
                        });
                      }}
                      className="bg-[#FF6B6B] border border-black px-4 py-2"
                    >
                      <Remove />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="my-6 text-center">Категории недоступны</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
