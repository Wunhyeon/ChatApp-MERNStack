"use client";

import { Chat } from "@/schema/ChatSchema";
import React, { useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import { useChat } from "@/lib/store/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CreateGroupChatModal from "./CreateGroupChatModal";
import { User } from "@/schema/UserShema";

const MyChat = ({ allUser }: { allUser: User[] }) => {
  const allChat = useChat((state) => state.chats);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (containerRef.current) {
        const viewportHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const availableHeight = viewportHeight - containerTop - 6;
        containerRef.current.style.height = `${availableHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  useEffect(() => {}, [allChat]);

  return (
    <div className="bg-slate-200 w-2/6 h-full" id="myChatContainer">
      <div className="flex justify-between">
        <h2 className="text-xl">MyChat</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">CreateGroupChat</Button>
          </DialogTrigger>
          <CreateGroupChatModal allUser={allUser} />
        </Dialog>
      </div>
      {allChat.map((el, idx) => {
        return <ChatCard chat={el} key={idx} />;
      })}
    </div>
  );
};

export default MyChat;
