"use client"

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react"

import { city } from "@/lib/city"
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useProductsAPI } from "@/app/(client)/hooks/api"

type Props = {
	buttonClassName?: string
	isOnHeader?: boolean
}

const SelectCity = (props: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const { filter, setFilter } = useProductsAPI()
	const { buttonClassName, isOnHeader = false } = props

	const [open, setOpen] = useState(false)
	const [selectedCity, setSelectedCity] = useState(city[0])

	const getCity = (name: string) => {
		console.log("getCity", name)
	}

	const createQueryString = useCallback(
		(newParams: any) => {
			const urlSearchParams = new URLSearchParams()

			for (const key in newParams) {
				if (newParams.hasOwnProperty(key)) {
					urlSearchParams.set(key, newParams[key])
				}
			}

			return urlSearchParams.toString()
		},
		[searchParams]
	)

	const handleSelectCity = (item: { id: number; name: string }) => {
		setSelectedCity(item)
		setOpen(false)
		setFilter({ ...filter, city: String(item.id)! })
		localStorage.setItem("city", JSON.stringify(item))

		router.push(
			`${pathname}?${createQueryString({ ...filter, city: item.id })}`
		)
	}

	useEffect(() => {
		const city = localStorage.getItem("city")
		if (city) setSelectedCity(JSON.parse(city))
	}, [])

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					aria-label="Select a team"
					className={cn("w-full justify-between", buttonClassName)}>
					{selectedCity?.name}
					<ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn("p-0", !isOnHeader && "z-10")}
				align="end"
				side="bottom">
				<Command>
					<CommandInput
						className="border-0 focus:border-0 focus:ring-0"
						placeholder="Pilih nama kota..."
						onChangeCapture={(e: any) => getCity(e.target.value)}
					/>
					<CommandList>
						<CommandEmpty>Nama Kota Tidak Ditemukan.</CommandEmpty>
						<CommandGroup>
							{city.map((item) => (
								<CommandItem
									key={item.id}
									className="cursor-pointer"
									onSelect={() => handleSelectCity(item)}>
									{item.name}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											selectedCity?.id === item?.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default SelectCity
