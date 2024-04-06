import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import SessionWrapper from "~/components/SessionWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <div className="align-self flex min-h-[100dvh] flex-col justify-between">
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
