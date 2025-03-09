import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type AuthorPropsType = {
  author: {
    name: string | null;
    image: string | null;
  };
  avatarSize?: "md" | "lg";
  textSize?: "md" | "lg";
};

export const Author = ({
  author,
  avatarSize = "md",
  textSize = "md",
}: AuthorPropsType) => {
  const avatarSizeClasses = {
    md: "w-8",
    lg: "w-18",
  };

  const textSizeClasses = {
    md: "text-sm",
    lg: "text-xl",
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage
          className={`${avatarSizeClasses[avatarSize]} w-8 rounded-full`}
          src={author.image ?? ""}
          alt={author.name ?? ""}
        />
      </Avatar>
      <p className={`${textSizeClasses[textSize]}`}>{author.name}</p>
    </div>
  );
};
