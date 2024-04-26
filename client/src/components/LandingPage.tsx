"use client";

import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug "
      >
        {/* Display the main heading */}
        Connect with combat sports enthusiasts worldwide. Discover, follow and
        never miss a fight with {/* Highlight the text */}
        <Highlight className="text-black dark:text-white">
          K0Club your Ultimate Fighting Connection{" "}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
