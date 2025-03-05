import { CATEGORY_MENU_ITEMS } from "@/constans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { SetStateAction } from "jotai";

type SideBarPresentationalPropsType = {
  pathname: string;
  category: string;
  setCategory: (value: SetStateAction<string>) => void;
};

export const SideBarPresentational = ({
  pathname,
  category,
  setCategory,
}: SideBarPresentationalPropsType) => {
  return (
    <>
      <aside className="md:h-screen md:w-[180px] hidden md:block">
        <ul className="px-5 py-10 flex flex-col gap-5">
          {pathname === "/" ? (
            CATEGORY_MENU_ITEMS.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setCategory(item.name)}
                >
                  <span
                    className={`font-bold ${
                      category === item.name ? "text-primary" : ""
                    }`}
                  >
                    # {item.name}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li>
              <Link href="/" className="flex items-center gap-2">
                <HomeIcon className="w-4" />
                <span className="font-bold">ホーム</span>
              </Link>
            </li>
          )}
        </ul>
      </aside>
      {pathname === "/" && (
        <div className="md:hidden mt-8 flex justify-center">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_MENU_ITEMS.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};
