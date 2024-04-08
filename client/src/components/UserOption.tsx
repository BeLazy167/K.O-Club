// UserOption.tsx
import React from "react";
import { User } from "~/@types/user.type";

interface UserOptionProps {
  user: User;
  onSelect: (user: User) => void;
}

export function UserOption({ user, onSelect }: UserOptionProps) {
  return (
    <div
      className="flex cursor-pointer items-center p-4 transition-colors hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
      onClick={() => onSelect(user)}
    >
      <div className="overflow-hidden rounded-md">
        <img
          alt="Avatar"
          className="aspect-[1/1]"
          height="40"
          src={user.image ?? "/placeholder.svg"}
          width="40"
        />
      </div>
      <div className="ml-4 grid gap-0.5 text-xs">
        <div className="font-medium">{user.name}</div>
        <div className="text-gray-500 dark:text-gray-400">@{user.username}</div>
      </div>
    </div>
  );
}
