import Link from "next/link";

export function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
        <LockIcon className="mb-4 h-16 w-16 text-gray-500 dark:text-gray-400" />
        <h1 className="text-4xl font-bold">Unauthorized Access</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          You do not have permission to view this content. Please log in to
          continue.
        </p>
        {/* Link component to handle navigation */}
        <Link
          className="mt-8 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/api/auth/signin/google"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rectangle shape representing a lock */}
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      {/* Path representing a keyhole */}
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
