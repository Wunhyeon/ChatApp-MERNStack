import React from "react";
import MessageList from "./ChatBox/MessageList";
import MessageInput from "./ChatBox/MessageInput";

const ChatBox = () => {
  return (
    <div className="bg-orange-500 w-full">
      ChatBox
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatBox;
