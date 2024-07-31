"use client";

import React, { useEffect, useState } from "react";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    console.log("fech Chats");

    const res = await fetch("api/chat");
    if (!res.ok) {
      throw new Error("Err in fetching data");
    }
    const json = await res.clone().json();
    console.log("res.json : ", json);
    setChats(json);

    return res.json();
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat, idx) => (
        <div key={idx}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chats;
