"use client";
import React from "react";
import { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { signInWithEmailAndPassword } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function Authform() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data);

      const { error } = JSON.parse(result);
      if (error?.message) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      toast({
        description: "Login successful",
      });
      return redirect("/application");
    });
  }

  return (
    <div className="w-[350px] mx-auto my-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-xl font-bold">Login</h1>
          <p>Start your shift!</p>
          <div className="grid w-full items-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email</FormLabel>
                  <FormControl>
                    <input
                      title="email"
                      type="text"
                      placeholder="Enter your email"
                      className="w-full text-sm px-5 py-2.5 rounded-md border text-black"
                      {...field}
                    />
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
                  <FormLabel className="text-xs">Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="••••••••••"
                      className="w-full text-sm px-5 py-2.5 rounded-md bg-foregroundBg text-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button type="submit">
              <span className={cn({ hidden: isPending })}>Login</span>
              <AiOutlineLoading3Quarters
                className={cn(" animate-spin", { hidden: !isPending })}
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
