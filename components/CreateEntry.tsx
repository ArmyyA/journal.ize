"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CreateEntry() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { toast } = useToast();

  // Entry creation
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        console.log("Error creating entry:", error);
        toast({
          title: "Woops! That wasn't supposed to happen.",
          description: `${error?.response?.data.message}`,
        });
      },

      onSuccess: (data) => {
        console.log(data);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const journalize = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <div>
      <Card className="shadow-md mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Make a Journal Entry</CardTitle>
          <CardDescription className="">
            Capture Your Thoughts, Emotions, and Experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={journalize}>
            <div className="outline-none flex flex-col">
              <Textarea
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
                placeholder="Capture away"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Button type="submit" disabled={isDisabled}>
                Journalize.
              </Button>
              <p
                className={`font-semibold ${
                  title.length > 300 ? "text-red-500" : "text-black"
                }`}
              >{`${title.length}/300`}</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
