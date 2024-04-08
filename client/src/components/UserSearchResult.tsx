import React from "react";
import { UserOption } from "./UserOption";
import { User } from "~/@types/user.type";

interface UserSearchResultsProps {
  results: User[];
  onSelect: (user: User) => void;
}

export function UserSearchResults({
  results,
  onSelect,
}: UserSearchResultsProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col gap-px">
        {results.map((user: User) => (
          <UserOption key={user.id} user={user} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
