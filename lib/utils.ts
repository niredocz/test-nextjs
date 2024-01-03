import { type ClassValue, clsx } from "clsx"
import { useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { twMerge } from "tailwind-merge"

// const searchParams = useSearchParams()!

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// export const createQueryString = useCallback(
// 	(newParams: any) => {
// 		const urlSearchParams = new URLSearchParams()

// 		for (const key in newParams) {
// 			if (newParams.hasOwnProperty(key)) {
// 				urlSearchParams.set(key, newParams[key])
// 			}
// 		}

// 		return urlSearchParams.toString()
// 	},
// 	[searchParams]
// )