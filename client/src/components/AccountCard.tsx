"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
export interface apires {
  username: string;
}
const updateUsername = async (username: string): Promise<apires> => {
  const response = await fetch("/api/username", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error("Error updating schema");
  }

  return response.json() as Promise<apires>;
};

export function AccountCard() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const { mutate: updateUsernameMutation, isPending } = useMutation<
    apires,
    Error,
    string
  >({
    mutationFn: updateUsername,
    onSuccess(data, variables, context) {
      toast({
        title: "Success",
        description: `updated to ${data.username ?? " "}`,
        variant: "default",
      });
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   const response = await fetch("/api/username", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username }),
    //   });

    //   if (response.ok) {
    //     // Schema updated successfully
    //     const { username } = (await response.json()) as apires;
    //     setUsername(() => username);
    //   } else {
    //     // Handle error case
    //     console.error("Error updating schema");
    //   }
    // } catch (error) {
    //   console.error("Error updating schema:", error);
    //   // Handle error case
    // }

    updateUsernameMutation(username);
  };

  if (session) {
    const { name, email, image, username: sessionUsername, id } = session.user;

    return (
      <Card key="1" className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <Avatar className="mx-auto flex h-16 w-16 max-w-sm flex-col items-center space-y-4">
          <AvatarImage
            src={image ?? "https://via.placeholder.com/150"}
            alt={name ?? "John Doe"}
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-sm flex-col space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input disabled id="name" value={name ?? "John Doe"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                value={email ?? "john@doe.com"}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                disabled={!session}
                id="username"
                name="username"
                placeholder={sessionUsername ?? ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
