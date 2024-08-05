// frontend/components/Authentication/Signup.tsx

"use client";

import React, { FormEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignupSchema } from "@/schema/SignupSchema";
import { THIS_URL } from "@/lib/constants";
import { toast } from "sonner";
import { signup } from "@/action/userAction";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  // const signUpForm =

  const signupForm = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    // defaultValues를 넣어줘야 경고가 뜨지 않는다. Warning: A component is changing an uncontrolled input to be controlled.
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 비밀번호 show hide
  const handleClick = (e: FormEvent) => {
    e.preventDefault(); // 이거 안해주면 버튼누르면 바로 폼 제출해버리니깐 해줘야함.
    setShow(!show);
  };

  // 폼 제출
  // const onSubmit = (values: z.infer<typeof SignupSchema>) => {
  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    const result = SignupSchema.safeParse(values);

    const res = await fetch(`${THIS_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const result = await res.json();
      console.log("result : ", result);

      toast.error(result.message, {
        position: "top-center",
        richColors: true,
        closeButton: true,
      });
    }

    console.log("res : ", res);
    router.push("/chats");

    // const res = await signup(values);
    // console.log("serverAction - res : ", res);

    // if (res.message) {
    //   toast.error(res.message, {
    //     position: "top-center",
    //     richColors: true,
    //     closeButton: true,
    //   });
    // }
  };

  const submitHandler = () => {};

  const postDetails = () => {};

  return (
    <Form {...signupForm}>
      <form className="space-y-2" onSubmit={signupForm.handleSubmit(onSubmit)}>
        <FormField
          control={signupForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name 📍</FormLabel>
              <FormControl id="first-name">
                <Input placeholder="Enter Your name" {...field} />
              </FormControl>
              {/* <FormDescription>Required</FormDescription> */}
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
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
          control={signupForm.control}
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

        <FormField
          control={signupForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password 📍</FormLabel>
              <div className="flex gap-2">
                <FormControl id="confirmPassword">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="pic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl id="pic">
                <Input placeholder="Enter Your Email" {...field} type="file" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="bg-blue-400 w-full mt-10">Sign Up</Button>
      </form>
    </Form>
  );
};

export default Signup;
