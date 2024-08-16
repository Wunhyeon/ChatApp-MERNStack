import { useUser } from "@/lib/store/user";
import { cn } from "@/lib/utils";
import { User } from "@/schema/UserShema";
import React from "react";

const Message = ({ sender, content }: { content: string; sender: User }) => {
  const user = useUser((state) => state.user);

  return (
    <div className="w-full">
      <div
        className={cn(
          sender._id === user?._id ? " bg-green-400" : "bg-yellow-400",
          sender._id === user?._id ? "ml-2" : "mr-4"
        )}
      >
        {sender.name} : {content}
      </div>
    </div>
  );
};

export default Message;
