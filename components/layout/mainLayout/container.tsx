import { MainLayoutPresentational } from "@/components/layout/mainLayout/presentational";
import { ChildrenType } from "@/type/children";

export const MainLayoutContainer = ({ children }: ChildrenType) => {
  return <MainLayoutPresentational>{children}</MainLayoutPresentational>;
};
