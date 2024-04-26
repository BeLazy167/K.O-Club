import { type ClassValue, clsx } from "clsx" // Importing the 'ClassValue' type and 'clsx' function from the 'clsx' library
import { twMerge } from "tailwind-merge" // Importing the 'twMerge' function from the 'tailwind-merge' library

// Defining a function called 'cn' which takes in multiple class values as inputs
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)) // Merging the class values using 'clsx' and then applying Tailwind CSS utility classes using 'twMerge'
}
