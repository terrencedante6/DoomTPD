"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Home() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        const result = await signInWithEmailAndPassword(data);
        const { error } = JSON.parse(result);

        if (error?.message) {
          console.error("Login Error:", error); // Debugging line
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
        window.location.href = "/application";
      } catch (e) {
        console.error("Unexpected Error:", e); // Catch any unexpected errors
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#1C1C1C]">
      <div className="bg-[#232323] rounded-lg p-8 flex w-4/5 shadow-lg border border-zinc-600 ">
        <div className="flex-1 mr-4">
          <div className="w-[350px] mx-auto my-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h1 className="text-xl font-bold text-white">Login</h1>
              <p className="text-white">Start your shift!</p>
              <div className="grid w-full items-center gap-4">
                <div>
                  <label className="text-xs text-white">Email</label>
                  <input
                    title="email"
                    type="text"
                    placeholder="Enter your email"
                    className="w-full text-sm px-5 py-2.5 rounded-md text-zinc-300 border border-zinc-600 bg-transparent"
                    {...form.register("email")}
                  />
                </div>
                <div>
                  <label className="text-xs text-white">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="w-full text-sm px-5 py-2.5 rounded-md text-zinc-300 border border-zinc-600 bg-transparent"
                    {...form.register("password")}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="btn bg-green-800 text-white border border-green-300 rounded-md hover:bg-green-600 transition-colors duration-500 w-[20%] py-1"
                >
                  <span className={cn({ hidden: isPending })}>Login</span>
                  <AiOutlineLoading3Quarters
                    className={cn("animate-spin", { hidden: !isPending })}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Home Page Content</h1>
        </div>
      </div>
    </div>
  );
}
