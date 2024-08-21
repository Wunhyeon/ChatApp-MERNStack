"use client";

import { Input } from "@/components/ui/input";
import { useMessage } from "@/lib/store/message";
import React from "react";
import { v4 as uuidV4 } from "uuid";
import { Message } from "@/schema/MessageSchema";
import { useUser } from "@/lib/store/user";
import { useChat } from "@/lib/store/chat";
import { sendMessage } from "@/action/chatAction";
import { socket } from "@/app/socket";
import { User } from "@/schema/UserShema";

const MessageInput = ({ user }: { user: User | null }) => {
  const addMessage = useMessage((state) => state.addMessage);
  const selectedChat = useChat((state) => state.selectedChat);

  const handleSendMessage = async (text: string) => {
    // 이거 나중에 서버랑 맞춰줘야겠다.
    const newMessageForServer = {
      content: text,
      chatId: selectedChat!._id,
    };
    const newMessageForOptimistic: Message = {
      sender: user!,
      content: text,
      chat: selectedChat!,
    };

    socket.emit("newMessage", newMessageForOptimistic);

    addMessage(newMessageForOptimistic);
    await sendMessage(newMessageForServer);

    socket.emit("test", "test");
  };

  return (
    <div>
      MessageInput
      <Input
        placeholder="new Message"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
            // enter 키를 누르면 메세지가 전송되도록.
            // e.nativeEvent.isComposing === false - 한글 두번 입력현상 방지
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = ""; // 메세지를 전송하고 나서 칸을 비워준다.
          }
        }}
      />
    </div>
  );
};

export default MessageInput;
