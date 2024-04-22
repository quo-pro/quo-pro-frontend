import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgoShort = (date: Date | string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'w', seconds: 604800 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'min', seconds: 60 },
    { label: 's', seconds: 1 }
  ];

  const interval = intervals.find(i => i.seconds <= seconds);
  if (interval === undefined) {
    return `${seconds}s`;
  }
  const count = Math.floor(seconds / interval.seconds);
  return `${count}${interval.label}`;
};
