import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@/schema/UserShema";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { GroupChatSchema } from "@/schema/GroupChatSchema";
import { makeGroupChat } from "@/action/chatAction";
import { useChat } from "@/lib/store/chat";

const CreateGroupChatModal = ({ allUser }: { allUser: User[] }) => {
  const [groupChatUsers, setGroupChatUsers] = useState<User[]>([]);
  const addChat = useChat((state) => state.addChat);

  // 이거 폼을 GroupChat Form으로 바꿔야함.
  const groupChatForm = useForm<z.infer<typeof GroupChatSchema>>({
    resolver: zodResolver(GroupChatSchema),
    defaultValues: {
      _id: "",
      chatName: "",
      isGroupChat: true,
      users: [],
    },
  });

  async function onSubmit(data: z.infer<typeof GroupChatSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    // alert("data : ", data);
    const res = await makeGroupChat(data);
    console.log("SubmitRes : ", res);
    if (!res) {
      throw new Error();
    }
    addChat(res);
    document.getElementById("createGroupChatCloseBtn")?.click();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Make Group Chat</DialogTitle>
        <DialogDescription>Make Group Chat</DialogDescription>
      </DialogHeader>
      <Form {...groupChatForm}>
        <form
          onSubmit={groupChatForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={groupChatForm.control}
            name="chatName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Chat Name</FormLabel>
                <FormControl>
                  <Input placeholder="Chat Name" {...field} />
                </FormControl>
                <FormDescription>Group Chat Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={groupChatForm.control}
            name="users"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>userName</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {/* {field.value
                          ? allUser.find((user) => user._id === field.value.)
                              ?.name
                          : "Select User"} */}
                        Select User
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Users..." />
                      <CommandList>
                        <CommandEmpty>No User Found.</CommandEmpty>
                        <CommandGroup>
                          {allUser.map((user) => (
                            <CommandItem
                              value={user._id}
                              key={user._id}
                              onSelect={() => {
                                //   form.setValue("language", language.value);
                                // alert(user._id);
                                let set = new Set([...groupChatUsers, user]);

                                setGroupChatUsers([...set]);
                                groupChatForm.setValue("users", [...set]);
                              }}
                            >
                              {/* <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user._id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              /> */}
                              {user.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-3">
            {groupChatForm.getValues("users")?.map((el) => {
              return <Badge key={el._id}>{el.name}</Badge>;
            })}
          </div>
          <Button type="submit">Submit</Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="hidden"
              id="createGroupChatCloseBtn"
            ></Button>
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateGroupChatModal;
