import { z } from "zod";
import { UserSchema } from "./UserShema";
import { ChatSchema } from "./ChatSchema";

const partialUser = UserSchema.partial({
  password: true,
});

export const MessageSchema = z.object({
  sender: partialUser,
  chat: ChatSchema,
  content: z.string(),
  _id: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;
