"use client";

import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { GithubIcon, GoogleIcon } from "@/components/icon";
import { Email } from "@/components/email";
import { LoginButton } from "@/components/loginButton";

type InputsType = {
  email: string;
};

type LoginFormPresentationalPropsType = {
  isGithubLoading: boolean;
  isGoogleLoading: boolean;
  setIsGithubLoading: (value: boolean) => void;
  setIsGoogleLoading: (value: boolean) => void;
  handleGitHubSignIn: () => void;
  handleGoogleSignIn: () => void;
  onSubmit: SubmitHandler<InputsType>;
  handleSubmit: UseFormHandleSubmit<InputsType, undefined>;
  register: UseFormRegister<InputsType>;
};

export const LoginFormPresentational = ({
  isGithubLoading,
  isGoogleLoading,
  setIsGithubLoading,
  setIsGoogleLoading,
  handleGitHubSignIn,
  handleGoogleSignIn,
  onSubmit,
  handleSubmit,
  register,
}: LoginFormPresentationalPropsType) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5"
    >
      <div className="md:max-w-sm mx-auto flex flex-col gap-4">
        <h1 className="text-lg font-bold text-center">ログイン</h1>
        <div className="flex flex-col gap-4 mt-4">
          <Email register={register} />
        </div>
        <div className="flex flex-col gap-4">
          <LoginButton
            text="Gihub"
            isLoading={isGithubLoading}
            onClick={() => {
              setIsGithubLoading(true);
              handleGitHubSignIn();
            }}
            icon={<GithubIcon size="24" />}
          />
          <LoginButton
            text="Google"
            isLoading={isGoogleLoading}
            onClick={() => {
              setIsGoogleLoading(true);
              handleGoogleSignIn();
            }}
            icon={<GoogleIcon size="24" />}
          />
        </div>
      </div>
    </form>
  );
};
