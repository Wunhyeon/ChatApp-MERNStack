import { getAllUser } from "@/action/userAction";
import ChatBox from "@/components/chats/ChatBox";
import ChatHeader from "@/components/chats/ChatHeader";
import MyChat from "@/components/chats/MyChat";
import { TOKEN } from "@/lib/constants";
import { Chat } from "@/schema/ChatSchema";
import { User } from "@/schema/UserShema";
import { cookies } from "next/headers";

const Chats = async () => {
  // const fetchChats = async () => {
  //   console.log("fech Chats");

  //   if (!res.ok) {
  //     throw new Error("Err in fetching data");
  //   }
  //   const json = await res.clone().json();
  //   console.log("res.json : ", json);
  //   setChats(json);

  //   return res.json();
  // };
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN)?.value;

  const getAllChat = async () => {
    try {
      const getAllChatRes = await fetch(`${process.env.SERVER_URL}/api/chat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!getAllChatRes.ok) {
        throw new Error("err in fetching data");
      }
      const allChat = await getAllChatRes.json();
      return allChat;
    } catch (err) {
      if (err) {
        console.log("err : ", err);
      }
    }
  };

  const allUser: User[] = await getAllUser(); // 사실 여기가 서버 컴포넌트이기 때문에 서버액션을 사용하지 않아도 된다. 아니, 안쓰는게 더 좋을 수 있다. 여기서는 그냥 씀.
  // console.log("allUser : ", allUser);
  const allChat: Chat[] = await getAllChat();

  return (
    <div className="bg-pink-400 h-screen">
      <ChatHeader allUser={allUser} />
      <div className="flex justify-between h-full">
        <MyChat allChat={allChat} />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chats;
