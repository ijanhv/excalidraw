"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema, SignUpSchema } from "@/schema";

type SignUpFormType = z.infer<typeof SignUpSchema>;
type SignInFormType = z.infer<typeof SignInSchema>;

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<SignUpFormType | SignInFormType>({
    resolver: zodResolver(isSignin ? SignInSchema : SignUpSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });



  const onSubmit = async (data: SignUpFormType | SignInFormType) => {
    setLoading(true);
    try {
      if (isSignin) {
        const res = await axios.post("/signin", data);
        alert("Signed in! Token: " + res.data.token);
      } else {
        const res = await axios.post("/signup", data);
        alert("User created with ID: " + res.data.userId);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="p-6 m-2 bg-white rounded shadow-md w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isSignin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Name</Label>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>Password</Label>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {isSignin ? "Sign in" : "Sign up"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
