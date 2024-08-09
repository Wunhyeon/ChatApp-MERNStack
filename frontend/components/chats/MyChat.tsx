"use client";

import { Chat } from "@/schema/ChatSchema";
import React, { useEffect, useRef } from "react";
import ChatCard from "./ChatCard";

const MyChat = ({ allChat }: { allChat: Chat[] }) => {
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

  return (
    <div className="bg-slate-200 w-2/6 h-full">
      MyChat
      {allChat.map((el, idx) => {
        return <ChatCard chat={el} key={idx} />;
      })}
    </div>
  );
};

export default MyChat;
