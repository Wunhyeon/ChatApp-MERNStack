import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNotification } from "@/lib/store/notification";

const NotiButton = () => {
  const notifications = useNotification((state) => state.notifications);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">🔔</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Noti</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {notifications.map((el, idx) => (
            <DropdownMenuCheckboxItem key={idx}>
              {el.message.content}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuCheckboxItem
          // checked={showPanel}
          // onCheckedChange={setShowPanel}
          ></DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* MyProfile Popup */}
    </Dialog>
  );
};

export default NotiButton;
