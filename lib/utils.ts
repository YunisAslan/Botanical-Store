import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDateTime() {
  const now = new Date();
  return now.toISOString(); // Convert to ISO 8601 format
}
