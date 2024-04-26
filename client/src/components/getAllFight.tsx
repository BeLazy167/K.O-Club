// getAllFights.tsx
// This file is responsible for fetching and displaying all fights

// Import necessary dependencies
import { useQuery } from "@tanstack/react-query"; // Library for managing and caching asynchronous data
import { Challenge } from "~/@types/fight.type"; // Type definition for Challenge
import Loading from "~/app/loading"; // Loading component
import { FightCard } from "~/components/main-fight-card"; // FightCard component

// Function to fetch all fights from the API
async function fetchAllFights() {
  const response = await fetch("/api/allFights", {
    cache: "no-store", // Disable caching to ensure fresh data
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fights"); // Throw an error if the API request fails
  }
  return response.json() as Promise<Challenge[]>; // Return the response as an array of Challenge objects
}

// Component to display all fights
export default function GetAllFights() {
  const {
    data: challenges, // Fetched data
    isLoading, // Loading state
    isError, // Error state
  } = useQuery({
    queryKey: ["allFights"], // Unique key for the query
    queryFn: fetchAllFights, // Function to fetch the data
    refetchOnWindowFocus: true, // Automatically refetch data when the window regains focus
  });

  // If data is still loading, display the Loading component
  if (isLoading) {
    return <Loading />;
  }

  // If there is an error, display an error message
  if (isError) {
    return (
      <div className="mt-4 flex h-screen flex-col">
        <div className="flex flex-col space-y-6">
          <div className="text-center text-2xl font-bold">
            Oops! Something went wrong!
          </div>
          <div className="mt-4 text-center text-lg">
            We are sorry, but we are unable to fetch the fights at the moment.
          </div>
          <div className="mt-2 text-center text-lg">
            Please try again later.
          </div>
        </div>
      </div>
    );
  }

  // If data is available, display the FightCard components for each challenge
  return (
    <div className="flex-row-reverse">
      {challenges?.map((challenge: Challenge) => {
        return <FightCard key={challenge.id} challenge={challenge} />;
      })}
    </div>
  );
}

// Path: client/src/components/main-fight-card.tsx
