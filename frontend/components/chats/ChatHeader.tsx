"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import MyProfilePopup from "../user/MyProfilePopup";
import { Ghost } from "lucide-react";
import { useUser } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import SearchUser from "./SearchUser";
import { User } from "@/schema/UserShema";

const ChatHeader = ({ allUser }: { allUser: User[] }) => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    console.log("chatsHeader - user : ", user);

    // if (!user) {
    //   router.push("/");
    // }
    // fetchChats();
  }, []);

  return (
    <div className="flex justify-between bg-slate-50 border-2 border-black ">
      {/* Drawer */}
      <div>
        <SearchUser allUser={allUser} />
      </div>
      {/* Drawer */}
      <div>
        <h1 className="text-2xl bg-blue-600">Chat!!</h1>
      </div>
      {/* MyInfo */}
      <div className="flex gap-3">
        <div>
          <Button variant={"outline"}>🔔</Button>
        </div>
        <div>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>⬇</div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Info</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuCheckboxItem
                // checked={showActivityBar}
                // onCheckedChange={setShowActivityBar}
                // disabled
                >
                  <DialogTrigger asChild>
                    {/* <Button className="bg-transparent " variant={"ghost"}>
                      Edit Profile
                    </Button> */}
                    <h1>Edit Profile</h1>
                  </DialogTrigger>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                // checked={showPanel}
                // onCheckedChange={setShowPanel}
                >
                  <p onClick={handleLogout}>Logout</p>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* MyProfile Popup */}
            <MyProfilePopup />
          </Dialog>
        </div>
      </div>
      {/* MyInfo */}
    </div>
  );
};

export default ChatHeader;
