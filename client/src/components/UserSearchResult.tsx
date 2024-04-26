import React from "react";
import { UserOption } from "./UserOption";
import { User } from "~/@types/user.type";

// Define the props interface for UserSearchResults component
interface UserSearchResultsProps {
  results: User[]; // Array of User objects
  onSelect: (user: User) => void; // Callback function to handle user selection
}

// UserSearchResults component
export function UserSearchResults({
  results,
  onSelect,
}: UserSearchResultsProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col gap-px">
        {/* Render UserOption component for each user in the results array */}
        {results.map((user: User) => (
          <UserOption key={user.id} user={user} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
