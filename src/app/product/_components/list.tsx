import { Edit, Remove } from "@/app/_components/icons";
import { Product, ProductsStorage } from "@/store/productsStorage";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "react-toastify";

interface ListProps
  extends Pick<ProductsStorage, "removeProduct" | "products"> {
  onProduct: Dispatch<SetStateAction<Product | null>>;
}

const List: FC<ListProps> = ({ products, onProduct, removeProduct }) => {
  return (
    <div className="mt-5">
      <h2>Созданные товары</h2>
      <div className="mt-3 border border-black">
        <div className="bg-[#CCEAFF] flex px-6 py-2">
          <div className="w-[120px]">№</div>
          <div className="w-[200px]">Наименование</div>
          <div className="">Категория </div>
        </div>
        <div>
          {products.length !== 0 ? (
            <>
              {products.map(
                (
                  { name, productId, category, photo, ...args }: Product,
                  idx
                ) => (
                  <div
                    key={productId}
                    className="flex px-6 hover:bg-slate-100 justify-between py-2 items-center border-t border-black"
                  >
                    <div className="flex ">
                      <div className="w-[120px]">{idx + 1}</div>
                      <div className="w-[200px]">{name}</div>
                      <div>{category.name}</div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          onProduct({
                            name,
                            productId,
                            category,
                            photo,
                            ...args,
                          })
                        }
                        className="bg-[#6BE1FF] border border-black px-4 py-2"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => {
                          removeProduct(productId);
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
                )
              )}
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
