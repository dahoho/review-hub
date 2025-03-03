"use client";

import { EmailPresentational } from "@/components/email/presentational";
import { UseFormRegister } from "react-hook-form";

type InputsType = {
  email: string;
};

type EmailContainerPropsType = {
  register: UseFormRegister<InputsType>;
};

export const EmailContainer = ({ register }: EmailContainerPropsType) => {
  return <EmailPresentational register={register} />;
};
