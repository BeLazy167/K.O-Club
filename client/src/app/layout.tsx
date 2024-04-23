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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <SocketContextProvider>
            <TanstackProvider>
              <div className="flex min-h-[100dvh] flex-col justify-between">
                <Navbar />
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <Toaster />
                <Footer />
              </div>
            </TanstackProvider>
          </SocketContextProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
