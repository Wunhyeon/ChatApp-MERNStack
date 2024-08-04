import { z } from "zod";

export const SignupSchema = z
  .object({
    _id: z.string().optional(), // 처음 회원가입 할때는 없을 수 있으므로 옵셔널로 둠
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string().optional(),
    pic: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // 이때 조건을 password === confirmPassword로 해줘야 서로 다를때 걸린다. !== 로 해주면 Password must match에 걸리지 않는다.
    message: "Password must match🤖🤖🤖",
    path: ["confirmPassword"],
  });

export type SignupType = z.infer<typeof SignupSchema>;
