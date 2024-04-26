// app/fights/page.tsx
import { unstable_noStore } from "next/cache";
import GetAllFights from "~/components/getAllFight";

/**
 * Renders the Page component.
 * This component renders the GetAllFights component and applies the unstable_noStore function.
 * @returns The rendered JSX element.
 */
export default function Page() {
  // Apply the unstable_noStore function so that the component does not use the cache (VERCEL SPECIFIC)
  unstable_noStore();

  // Render the GetAllFights component
  return <GetAllFights />;
}
