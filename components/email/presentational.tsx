import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

type InputsType = {
  email: string;
};

type EmailPresentationalProps = {
  register: UseFormRegister<InputsType>;
};

export const EmailPresentational = ({ register }: EmailPresentationalProps) => {
  return (
    <>
      <Input
        type="email"
        placeholder="メールアドレス"
        {...register("email", { required: true })}
      />
      <Button type="submit">メールアドレスでログイン</Button>
    </>
  );
};
