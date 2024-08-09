import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { User } from "@/schema/UserShema";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4 m-2 hover:bg-slate-400">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-md font-medium leading-none">{user.name}</p>
        <p className="text-sm text-muted-foreground">Email : {user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
