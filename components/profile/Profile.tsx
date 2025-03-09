import { Author } from "@/components/author";
import { User } from "next-auth";

type ProfilePropsType = {
  user?: User;
};

export const Profile = ({ user }: ProfilePropsType) => {
  if (!user) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold">プロフィール</h2>
      <div className="mt-14">
        <Author
          author={{ name: user.name ?? "", image: user.image ?? "" }}
          avatarSize="lg"
          textSize="lg"
        />
        <p className="mt-10 leading-7">
          フロントエンドエンジニア。React が好きです。
        </p>
      </div>
    </section>
  );
};
