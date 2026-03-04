import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Simple XSS sanitiser – strips angle brackets to prevent tag injection.
 */
export function sanitizeHTML(str: string): string {
  return str.replace(/[<>]/g, '')
}

/** Tailwind class merging helper */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
