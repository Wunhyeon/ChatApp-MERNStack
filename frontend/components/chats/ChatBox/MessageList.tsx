"use client";

import { useMessage } from "@/lib/store/message";
import React, { useEffect } from "react";
import Message from "./Message";
import { useUser } from "@/lib/store/user";

const MessageList = () => {
  const messages = useMessage((state) => state.messages);
  const user = useUser((state) => state.user);

  useEffect(() => {}, [messages]);

  return (
    <div className="bg-slate-300 w-full h-4/5">
      MessageList
      {messages.length > 0 ? (
        <div>
          {messages.map((message, idx) => {
            return (
              <div key={idx} className="">
                <Message sender={message.sender} content={message.content} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1 className="text-5xl">Please Select Chat Room</h1>
        </div>
      )}
    </div>
  );
};

export default MessageList;
