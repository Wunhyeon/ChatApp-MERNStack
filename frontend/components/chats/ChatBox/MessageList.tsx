"use client";

import { useMessage } from "@/lib/store/message";
import React, { useEffect } from "react";
import Message from "./Message";
import { useUser } from "@/lib/store/user";
import { User } from "@/schema/UserShema";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageList = ({ user }: { user: User | null }) => {
  const messages = useMessage((state) => state.messages);

  useEffect(() => {}, [messages]);

  return (
    <div className="bg-slate-300 w-full h-2/5">
      MessageList
      {messages.length > 0 ? (
        <ScrollArea className="h-3/5 w-full rounded-md border">
          {messages.map((message, idx) => {
            return (
              <Message
                sender={message.sender}
                content={message.content}
                key={idx}
              />
            );
          })}
        </ScrollArea>
      ) : (
        <div>
          <h1 className="text-5xl">Please Select Chat Room</h1>
        </div>
      )}
    </div>
  );
};

export default MessageList;
