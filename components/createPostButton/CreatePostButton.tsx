import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type CreatePostButtonProps = {
  createPost: () => void;
  isLoading: boolean;
};

export const CreatePostButton = ({
  createPost,
  isLoading,
}: CreatePostButtonProps) => {
  return (
    <Button
      onClick={createPost}
      disabled={isLoading}
      className="cursor-pointer font-bold md:px-6 px-4 text-xs md:text-sm bg-primary text-white rounded-md py-1.5"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      レビュー依頼
    </Button>
  );
};
