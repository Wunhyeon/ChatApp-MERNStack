// frontend/action/userAction.ts

"use server";

import { TOKEN } from "@/lib/constants";
import { SigninType } from "@/schema/SigninSchema";
import { SignupType } from "@/schema/SignupSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 주의. 이거 export하면 안됨.
const getToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN)?.value;
  if (!token) {
    redirect("/"); // 인증에 필요한 토큰이 없을 경우 다시 로그인하도록
  }
  return token;
};

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
  const cookieStore = cookies();
  const res = await fetch(`${process.env.SERVER_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    return await res.json();
  }

  const result = await res.json();
  cookieStore.set(TOKEN, result.token, {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
  }); // 1000 밀리세컨드 = 1초 * 60 = 1분 * 60 = 1시간 * 24 = 하루 * 30 = 한달

  return {
    _id: result._id,
    name: result.name,
    email: result.email,
    pic: result.pic,
  };
};

export const getAllUser = async () => {
  const token = getToken();
  const res = await fetch(`${process.env.SERVER_URL}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  // console.log("result : ", result);
  return result;
};
