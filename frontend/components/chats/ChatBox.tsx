// frontend/components/ChatBox.tsx

"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import MessageList from "./ChatBox/MessageList";
import MessageInput from "./ChatBox/MessageInput";
import { ENDPOINT } from "@/lib/constants";
import io from "socket.io-client";
import { socket } from "@/app/socket";
import { UserContext, useUser } from "@/lib/store/user";
import { useMessage } from "@/lib/store/message";
import { useChat } from "@/lib/store/chat";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { useNotification } from "@/lib/store/notification";

const ChatBox = () => {
  const user = useUser((state) => state.user);
  const endPoint = ENDPOINT;
  let selectedChatCompare;
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const addMessage = useMessage((state) => state.addMessage);
  const selectedChat = useChat((state) => state.selectedChat);
  const [loginUser, setLoginUser] = useState(false);
  const router = useRouter();
  const addNoti = useNotification((state) => state.addNotification);

  const store = useContext(UserContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  // const bears = useStore(store, (s) => s.bears)

  // useUserStore(useUser());

  const onConnect = () => {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });
    console.log("client socket connected");
    console.log("onConnect - user : ", user);

    if (user) {
      console.log("setup - user");

      socket.emit("setup", user);
    } else {
      // router.push("/");
    }
  };

  const onDisconnect = () => {
    socket.disconnect();
    // console.log("on disconnect");
  };

  useEffect(() => {
    // socket.on("disconnect", onDisconnect);
    console.log("@@@ user : ", user);
    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      // socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    // 여기서 왜 메세지를 받지 못할까???????? 내가 보낸 메세지는
    // if (isConnected) {
    //   console.log("messageReceived - useEffect");

    socket.on("io-user-messageReceived", (newMessageReceived) => {
      console.log("io-user-messageReceived : ", newMessageReceived);
    });
    socket.on("io-chat-messageReceived", (newMessageReceived) => {
      console.log("io-chat-messageReceived : ", newMessageReceived);
    });

    socket.on("socket-user-messageReceived", (newMessageReceived) => {
      console.log("socket-user-messageReceived : ", newMessageReceived);
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        addNoti({ message: newMessageReceived, isChecked: false });
      } else {
      }
    });

    socket.on("socket-chat-messageReceived", (newMessageReceived) => {
      console.log("socket-chat-messageReceived : ", newMessageReceived);
      // if (
      //   !selectedChatCompare || // if chat is not selected or doesn't match current chat
      //   selectedChatCompare._id !== newMessageRecieved.chat._id
      // ) {
      //   if (!notification.includes(newMessageRecieved)) {
      //     setNotification([newMessageRecieved, ...notification]);
      //     setFetchAgain(!fetchAgain);
      //   }
      // } else {
      // }
      // setMessage
      console.log("selectedChat : ", selectedChat);

      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        // addNoti({ message: newMessageReceived, isChecked: false });
      } else {
        addMessage(newMessageReceived);
      }
    });
    // }

    return () => {
      socket.off("socket-user-messageReceived");
      socket.off("socket-chat-messageReceived");
    };
  }, [selectedChat]);

  return (
    <div className="bg-orange-500 w-full">
      ChatBox
      <MessageList user={user} />
      <MessageInput user={user} />
    </div>
  );
};

export default ChatBox;
