"use client";

import React, { createContext, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MyChat from "./MyChat";
import ChatBox from "./ChatBox";
import InitChat from "@/lib/store/InitChat";
import { User } from "@/schema/UserShema";
import { Chat } from "@/schema/ChatSchema";
import { UserContext, UserStore, useUser } from "@/lib/store/user";

const ChatClientPage = ({
  allUser,
  allChat,
}: {
  allUser: User[];
  allChat: Chat[];
}) => {
  const userStore = useRef(useUser).current;

  return (
    <UserContext.Provider value={userStore}>
      <div>
        <ChatHeader allUser={allUser} />
        <div className="flex justify-between h-full">
          <MyChat allUser={allUser} />
          <ChatBox />
        </div>
        <InitChat chat={allChat} />
      </div>
    </UserContext.Provider>
  );
};

export default ChatClientPage;
