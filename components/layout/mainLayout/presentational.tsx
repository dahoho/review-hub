import { ChildrenType } from "@/type/children";

export const MainLayoutPresentational = ({ children }: ChildrenType) => {
  return (
    <main className="md:w-[calc(100%-180px)] md:border-l md:border-gray-300 mt-8 md:mt-0 px-5 py-10">
      {children}
    </main>
  );
};
