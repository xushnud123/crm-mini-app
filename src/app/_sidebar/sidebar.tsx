import cn from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Главная",
    url: "/",
  },
  {
    name: "Категории",
    url: "/categories",
  },
  {
    name: "Товар",
    url: "/product",
  },
  {
    name: "Корзина",
    url: "/basket",
  },
];

const Sidebar = ({}) => {
  const pathname = usePathname();
  return (
    <div className="block px-4 border-r border-black h-screen overflow-y-auto">
      <div className="flex flex-col gap-4 mt-20">
        {menus.map((menu, index) => (
          <Link
            href={menu.url}
            key={index}
            className={cn(
              "hover:text-blue-400 px-4 py-2 rounded-md hover:bg-slate-200",
              pathname === menu.url
                ? "bg-slate-200 text-blue-400"
                : "text-black"
            )}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
