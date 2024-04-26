import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import SessionWrapper from "~/utils/SessionWrapper";
import TanstackProvider from "~/utils/Provider";
import { SocketContextProvider } from "~/utils/SocketContext";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "K0club",
  description:
    "K0club is a platform for boxing fans to share their favorite fights and fighters.",
  icon: "../../public/favicon.ico",
};

/**
 * Root layout component that wraps the entire application.
 * @param children - The child components to be rendered within the layout.
 * @returns The JSX element representing the root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          {/* Socket context provider */}
          <SocketContextProvider>
            {/* Tanstack provider */}
            <TanstackProvider>
              {/* Main layout container */}
              <div className="flex min-h-[100dvh] flex-col justify-between">
                {/* Navbar component */}
                <Navbar />
                {/* Suspense fallback for lazy loading */}
                <Suspense fallback={<Loading />}>{children}</Suspense>
                {/* Toast notifications */}
                <Toaster />
                {/* Footer component */}
                <Footer />
              </div>
            </TanstackProvider>
          </SocketContextProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
