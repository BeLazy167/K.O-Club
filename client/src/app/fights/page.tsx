import { unstable_noStore } from "next/cache";
import GetAllFights from "~/components/getAllFight";

export default function Page() {
  unstable_noStore();

  return <GetAllFights />;
}
