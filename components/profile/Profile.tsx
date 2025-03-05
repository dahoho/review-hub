import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";

type ProfilePropsType = {
  user?: User;
};

export const Profile = ({ user }: ProfilePropsType) => {
  if (!user) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold">プロフィール</h2>
      <div className="flex gap-4 mt-14">
        <Avatar>
          <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
        </Avatar>
        <div>
          <p className="font-bold">{user.name ?? ""}</p>
          <p className="mt-2 leading-7">
            自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。
          </p>
        </div>
      </div>
    </section>
  );
};
