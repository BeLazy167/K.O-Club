//app/dashboard/page.tsx

import { AccountCard } from "~/components/AccountCard";

/**
 * Renders the Page component.
 * @returns The rendered Page component.
 */
export default function Page() {
  // Render a div container with flex and justify-center classes
  return (
    <div className="flex justify-center">
      {/* Render the AccountCard component */}
      <AccountCard />
    </div>
  );
}
