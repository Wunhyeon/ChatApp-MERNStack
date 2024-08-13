"use server";

import { TOKEN } from "@/lib/constants";
import { GroupChat } from "@/schema/GroupChatSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { stringify } from "flatted";
// 주의. 이거 export하면 안됨.
const getToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN)?.value;
  if (!token) {
    redirect("/"); // 인증에 필요한 토큰이 없을 경우 다시 로그인하도록
  }
  return token;
};

export const accessOneOnOne = async (userId: string) => {
  let result = undefined;
  const token = getToken();
  try {
    const accessOneOnOneRes = await fetch(
      `${process.env.SERVER_URL}/api/chat`,
      {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!accessOneOnOneRes.ok) {
      throw new Error("err in accessOneOnONe");
    }
    result = await accessOneOnOneRes.json();
  } catch (err) {
    if (err) {
      console.log("err : ", err);
    }
  }

  return result;
};

export const makeGroupChat = async (form: GroupChat) => {
  const token = getToken();
  // console.log("form : ", stringify(form, null, 2));
  console.log("form : ", form);

  const obj = {
    chatName: form.chatName,
    users: JSON.stringify(form.users),
  };

  console.log("JSON.stringify : ", JSON.stringify(obj));

  let result = undefined;
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/chat/group`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("err");
    }
    result = await res.json();
  } catch (err) {
    console.log("err in makeGroupChat : ", err);
    result = err;
  }
  return result;
};
