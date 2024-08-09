"use client";

import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@/lib/store/user";
import Image from "next/image";

const MyProfilePopup = () => {
  const user = useUser((state) => state.user);

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>My Profile</DialogTitle>
          <DialogDescription>😋</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <div className="w-44 h-44 relative ">
            <Image
              src={user?.pic ? user.pic : "https://github.com/shadcn.png"}
              alt="userPic"
              fill
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl">{user?.email}</h1>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">OK</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default MyProfilePopup;
