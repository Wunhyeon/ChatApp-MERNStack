import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string().optional(), // 처음 회원가입 할때는 없을 수 있으므로 옵셔널로 둠
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  pic: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
