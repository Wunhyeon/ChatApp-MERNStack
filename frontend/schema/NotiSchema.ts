import { z } from "zod";
import { MessageSchema } from "./MessageSchema";

export const NotiSchema = z.object({
  _id: z.string().optional(),
  message: MessageSchema,
  isChecked: z.boolean().default(false),
});

export type Notification = z.infer<typeof NotiSchema>;
