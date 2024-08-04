import { z } from "zod";
import { UserSchema } from "./UserShema";

const partialUser = UserSchema.partial({
  password: true,
});

export const ChatSchema = z.object({
  chatName: z.string(),
  isGroupChat: z.boolean().default(false),
  users: partialUser.array(),
  groupAdmin: partialUser,
});

export type Chat = z.infer<typeof ChatSchema>;
