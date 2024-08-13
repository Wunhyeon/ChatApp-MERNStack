import { z } from "zod";
import { UserSchema } from "./UserShema";

const partialUser = UserSchema.partial({
  password: true,
});

export const GroupChatSchema = z
  .object({
    _id: z.string().optional(),
    chatName: z.string(),
    isGroupChat: z.boolean().default(true),
    users: partialUser.array(),
    groupAdmin: partialUser.optional(),
  })
  .refine((data) => data.users.length > 1, {
    message: "Choose Over 1",
    path: ["users"],
  });

export type GroupChat = z.infer<typeof GroupChatSchema>;
