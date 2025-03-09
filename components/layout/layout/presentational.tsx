import { SideBar } from "@/components/layout/sideBar";
import { Header } from "@/components/layout/header";
import { ChildrenType } from "@/type/children";
import { User } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/layout/footer";

type HeaderPresentationalPropsType = {
  user?: User;
} & ChildrenType;

export const LayoutPresentational = ({
  user,
  children,
}: HeaderPresentationalPropsType) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] grid-cols-[100%]">
      <Header user={user} />
      <div className="md:flex">
        <SideBar />
        {children}
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};
