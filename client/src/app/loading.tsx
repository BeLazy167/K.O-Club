import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col space-y-6">
        <div className="text-center text-2xl font-bold">
          Hold your horses! Your epic fight is loading...
        </div>
        <div className="mt-4 text-center text-lg">
          {"Don't"} worry, we are just warming up the punching bags and
          polishing the boxing gloves!
        </div>
        <div className="mt-2 text-center text-lg">
          In the meantime, feel free to practice your victory dance!
        </div>
      </div>
      <Skeleton className="mt-2 h-[200px] w-[400px] rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-[400px]" />
        <Skeleton className="h-6 w-[350px]" />
        <Skeleton className="h-6 w-[300px]" />
        <Skeleton className="h-6 w-[250px]" />
      </div>
    </div>
  );
}
