import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { User } from "@/schema/UserShema";
import UserCard from "./UserCard";
import { ScrollArea } from "../ui/scroll-area";
import { getAllUser } from "@/action/userAction";

const SearchUser = ({ allUser }: { allUser: User[] }) => {
  useEffect(() => {}, []);

  const [searchName, setSearchName] = useState<string>("");
  // const allUser: User[] = await getAllUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Search User🔎</Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Users</SheetTitle>
          <SheetDescription>Search Users</SheetDescription>
          <Input
            onChange={(e) => setSearchName(e.currentTarget.value)}
            placeholder="Search User🔎"
          />
        </SheetHeader>
        {/* 본문 */}
        <ScrollArea className="h-4/5 rounded-md border">
          {allUser.length > 0 ? (
            allUser
              .filter((el) => {
                if (searchName) {
                  return (
                    el.name.includes(searchName) ||
                    el.email.includes(searchName)
                  );
                } else {
                  return el;
                }
              })
              .map((el, idx) => <UserCard user={el} key={el._id} />)
          ) : (
            <></>
          )}
        </ScrollArea>
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchUser;
