"use client"; // react hook을 사용할 거기 때문에, 클라이언트 컴포넌트로
import React, { useEffect, useRef } from "react";
import { useUser } from "./user"; // 위에서 zustand로 만든 상태관리 객체
import { User } from "@/schema/UserShema";
import { Chat } from "@/schema/ChatSchema";
import { useChat } from "./chat";

const InitChat = ({ chat }: { chat: Chat[] }) => {
  // props로 유저 객체를 받아옴.
  const initState = useRef(false); // 초기값

  useEffect(() => {
    if (!initState.current) {
      // 초기값이 false라면, state management를 할 수 있도록 user객체를 넣어준다.
      //   useUser.setState({ user });
      useChat.setState({ chats: chat });
    }

    initState.current = true;
  }, []);

  return <></>;
};

export default InitChat;
