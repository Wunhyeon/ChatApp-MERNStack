"use client";

import { SigninSchema } from "@/schema/SigninSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signin } from "@/action/userAction";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  // const signUpForm =

  const signinForm = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    // defaultValues를 넣어줘야 경고가 뜨지 않는다. Warning: A component is changing an uncontrolled input to be controlled.
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 비밀번호 show hide
  const handleClick = (e: FormEvent) => {
    e.preventDefault(); // 이거 안해주면 버튼누르면 바로 폼 제출해버리니깐 해줘야함.
    setShow(!show);
  };

  // 폼 제출
  const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
    const result = await signin(values);
    if (result.error) {
      toast.error(result.error, { richColors: true, position: "top-center" });
    } else {
      // 로그인 성공
      router.push("/chats");
    }
  };

  return (
    <Form {...signinForm}>
      <form className="space-y-2" onSubmit={signinForm.handleSubmit(onSubmit)}>
        <FormField
          control={signinForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email 📍</FormLabel>
              <FormControl id="email">
                <Input placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signinForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password 📍</FormLabel>
              <div className="flex gap-2">
                <FormControl id="password">
                  <Input
                    placeholder="Enter Your Email"
                    {...field}
                    type={show ? "text" : "password"}
                  />
                </FormControl>
                <Button onClick={handleClick} variant={"ghost"}>
                  {show ? "Hide" : "Show"}
                </Button>
              </div>
            </FormItem>
          )}
        />

        <Button className="bg-blue-400 w-full mt-10">Login</Button>
      </form>
    </Form>
  );
};

export default Login;
