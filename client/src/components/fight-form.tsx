"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { debounce } from "~/lib/debounce";
import { UserSearchResults } from "./UserSearchResult";
import { User } from "~/@types/user.type";
import { toast } from "./ui/use-toast";

export function FightForm() {
  // State variables
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  // Event handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSearch = debounce(async (query: string) => {
    if (query.trim() !== "") {
      const response = await fetch("/api/username/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (response.ok) {
        const { users } = (await response.json()) as { users: User[] };

        setSearchResults(users);
      } else {
        console.error("Error searching users");
      }
    } else {
      setSearchResults([]);
    }
  }, 300);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    if (user.username) {
      setSearchQuery(user.username);
    }
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, location, date, time } = formData;
    const fightData = {
      title,
      description,
      location,
      dateTime: `${date}T${time}:00.000Z`,
      challengedId: selectedUser?.id,
    };

    try {
      const response = await fetch("/api/fight/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fightData),
      });

      if (response.ok) {
        // Reset form fields
        toast({
          title: "Fight Request Sent",
          description: "You have requested a fight with the user",
        });
        setFormData({
          title: "",
          description: "",
          location: "",
          date: "",
          time: "",
        });
        setSelectedUser(undefined);
        setSearchQuery("");
      } else {
        console.error("Error creating fight invitation");
      }
    } catch (error) {
      console.error("Error creating fight invitation:", error);
    }
  };

  const handleChallangedChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
    await handleSearch(e.target.value);
  };

  return (
    <Card key="1">
      <form onSubmit={handleSubmit}>
        {/* Card Header */}
        <CardHeader>
          <CardTitle>Create fight invitation</CardTitle>
          <CardDescription>Challenge someone to a duel.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter the fight title"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter the fight description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            {/* Challenged User */}
            <div className="space-y-2">
              <Label htmlFor="challenged">Challenged User</Label>
              <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <Input
                  id="challenged"
                  placeholder="Enter the challenged user's username"
                  value={searchQuery}
                  onChange={handleChallangedChange}
                />
              </div>
              {searchResults.length > 0 && (
                <UserSearchResults
                  results={searchResults}
                  onSelect={handleUserSelect}
                />
              )}
            </div>
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter the location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            {/* Date and Time */}
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        {/* Card Footer */}
        <CardFooter className="flex justify-end">
          <Button type="submit">Create fight</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
// Path: client/src/components/fight-form.tsx
