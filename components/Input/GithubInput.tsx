"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useSetRecoilState } from "recoil";
import {
  graphState,
  loadingState,
  usernameState,
  userStatsState,
} from "@/Recoil/State/atom";
import fetchUser from "@/actions/fetchUser";
import fetchGraph from "@/actions/fetchGraph";
import { toast } from "@/hooks/use-toast";

const githubInputSchema = z.object({
  username: z.string().min(2).max(50),
});

const GithubInput = () => {
  const setUsername = useSetRecoilState(usernameState);
  const setLoading = useSetRecoilState(loadingState);
  const setUserStats = useSetRecoilState(userStatsState);
  const setGraphState = useSetRecoilState(graphState);

  const form = useForm<z.infer<typeof githubInputSchema>>({
    resolver: zodResolver(githubInputSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof githubInputSchema>) {
    setLoading(true);
    toast({ title: "Generating", generating: true });
    setUsername(values.username);
    const { userStats } = await fetchUser(values.username);
    const graph = await fetchGraph(values.username);
    setUserStats(userStats);
    setGraphState(graph);
    setLoading(false);
    if (graph.graph === "No contributions this year") {
      toast({
        title: "User not found",
        description: "Please check your username",
      });
    } else {
      toast({ title: "Your Aura is generated" });
    }
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" relative">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="font-modernreg">
                {/* <FormLabel className="text-zinc-100/80">Username</FormLabel>/ */}
                <FormDescription className="text-white/90 font-modernmono text-lg">Enter your Github username</FormDescription>
                <FormControl>
                  <Input placeholder="Eg. codeaashu" {...field} className="bg-zinc-800/20 backdrop-blur-xl backdrop-saturate-200" />
                </FormControl>
                <FormDescription className="text-white/80 font-modernmono text-lg mt-1">Flex Your Coding Aura on Social.</FormDescription>
                <FormDescription className="text-white/80 font-modernmono text-lg mt-1">Generate. Download. Share.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2  text-white"
            type="submit"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GithubInput;
