"use client"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import type { TFilter } from "@/app/(client)/hooks/types"
import React, { useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useProductsAPI } from "@/app/(client)/hooks/api"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SelectCity from "@/components/shared/SelectCity"

const FilterSchema = zod.object({
	search: zod.optional(zod.string()),
	status: zod.enum(["active", "inactive"]),
})

const FilterProducts = () => {
	const { filter, setFilter } = useProductsAPI()
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const filterForm = useForm<zod.infer<typeof FilterSchema>>({
		defaultValues: {
			search: "",
			status: "active",
		},
	})

	const createQueryString = useCallback(
		(data: TFilter) => {
			const searchParams = new URLSearchParams()
			if (data.search) {
				searchParams.set("search", data.search)
			}
			if (data.status) {
				searchParams.set("status", data.status)
			}
			return searchParams.toString()
		},
		[searchParams]
	)

	type TType = "buy" | "rent"

	const onSubmit = (data: zod.infer<typeof FilterSchema>) => {
		const type: TType = searchParams.get("type")
		if (type) setFilter({ ...filter, type })

		router.push(
			`${pathname}?${createQueryString({
				...filter,
				search: data.search,
				status: data.status,
			})}`
		)
	}

	useEffect(() => {
		filterForm.setValue("search", searchParams.get("search")!)
		filterForm.setValue("status", searchParams.get("status"))

		console.log("first", searchParams.get("status"))
	}, [searchParams])

	return (
		<div className="flex flex-col min-w-[300px] border rounded-lg p-4">
			<h1 className="text-xl font-bold">Filter Produk</h1>

			<Form {...filterForm}>
				<form
					onSubmit={filterForm.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 mt-4 h-full">
					<FormField
						control={filterForm.control}
						name="search"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pencarian Produk</FormLabel>
								<FormControl>
									<Input
										placeholder="Cari produk"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={filterForm.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status Produk</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="active" />
											</FormControl>
											<FormLabel className="font-normal cursor-pointer">
												Tersedia
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="inactive" />
											</FormControl>
											<FormLabel className="font-normal cursor-pointer">
												Tidak Tersedia
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>

					<SelectCity />

					<Button
						type="submit"
						className="mt-auto">
						Cari
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default FilterProducts
