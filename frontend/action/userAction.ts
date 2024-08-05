// frontend/action/userAction.ts

"use server";

import { SigninType } from "@/schema/SigninSchema";
import { SignupType } from "@/schema/SignupSchema";

export const signup = async (form: SignupType) => {
  const res = await fetch(`${process.env.SERVER_URL}/api/user`, {
    method: "POST",
    headers: {
      // header 꼭 넣어줘야함. 안넣어주면 제대로 전송 안됨.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  // console.log("@@@ res : ", await res.json());
  const result = await res.json();

  // if (result._id) {
  //   return result;
  // } else {
  //   return result.message;
  // }
  return result;
};

export const signin = async (form: SigninType) => {
  const res = await fetch(`${process.env.SERVER_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const result = await res.json();

  return result;
};
