import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { User } from "@/schema/UserShema";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Chat } from "@/schema/ChatSchema";
import { useUser } from "@/lib/store/user";

const ChatCard = ({ chat }: { chat: Chat }) => {
  // console.log("chat.users : ", chat.users);

  let chatName = chat.chatName;
  const loginUser = useUser((state) => state.user);
  if (!chat.isGroupChat) {
    chatName = chat.users.filter((el) => el._id != loginUser?._id)[0].name;
  }

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4 m-2 hover:bg-slate-400 border-black">
      <div className="flex-1 space-y-1">
        <p className="text-md font-medium leading-none">{chatName}</p>
        {/* <p className="text-sm text-muted-foreground">Email : {user.email}</p> */}
      </div>
    </div>
  );
};

export default ChatCard;
