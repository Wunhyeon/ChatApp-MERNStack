import { z } from "zod";
import { UserSchema } from "./UserShema";

const partialUser = UserSchema.partial({
  password: true,
});

export const ChatSchema = z
  .object({
    _id: z.string(),
    chatName: z.string(),
    isGroupChat: z.boolean().default(false),
    users: partialUser.array(),
    groupAdmin: partialUser,
  })
  .refine((data) => {
    console.log("data : ", data);
  });

export type Chat = z.infer<typeof ChatSchema>;
