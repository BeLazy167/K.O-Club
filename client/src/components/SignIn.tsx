"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  
  const handleSignIn = async () => {
    // Sign in with the next-auth signIn method
    try {
      setLoading(true);
      await signIn("google", {
        callbackUrl: `${window.location.origin}/dashboard`,
        redirect: false,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}
