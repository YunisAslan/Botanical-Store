import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDateTime() {
  const now = new Date();
  return now.toISOString(); // Convert to ISO 8601 format
}

// custom capitalize function for product names.
export function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
