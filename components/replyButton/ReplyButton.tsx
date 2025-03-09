import { MessageCircle } from "lucide-react";
import React from "react";

type ReplyButtonPropsType = {
  handleClickSetReplying: () => void;
};

export const ReplyButton = ({
  handleClickSetReplying,
}: ReplyButtonPropsType) => {
  return (
    <div className="ml-8">
      <button
        className="text-gray-500 text-sm flex items-center gap-2 cursor-pointer"
        onClick={handleClickSetReplying}
      >
        <MessageCircle size={18} />
        返信
      </button>
    </div>
  );
};
