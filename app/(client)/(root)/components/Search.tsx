"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"

const FormSchema = zod.object({
	username: zod.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
})

const SearchHomePage = () => {
	const form = useForm<zod.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
		},
	})

	const onSubmit = (data: zod.infer<typeof FormSchema>) => {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="relative">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									className="pl-6 pr-20 h-12 w-full rounded-2xl"
									placeholder="Cari Produk kamu disini ..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="absolute right-1 top-1 rounded-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M15.755 14.255H14.965L14.685 13.985C15.665 12.845 16.255 11.365 16.255 9.755C16.255 6.165 13.345 3.255 9.755 3.255C6.165 3.255 3.255 6.165 3.255 9.755C3.255 13.345 6.165 16.255 9.755 16.255C11.365 16.255 12.845 15.665 13.985 14.685L14.255 14.965V15.755L19.255 20.745L20.745 19.255L15.755 14.255ZM9.755 14.255C7.26501 14.255 5.255 12.245 5.255 9.755C5.255 7.265 7.26501 5.255 9.755 5.255C12.245 5.255 14.255 7.265 14.255 9.755C14.255 12.245 12.245 14.255 9.755 14.255Z"
							fill="#fff"
						/>
					</svg>
				</Button>
			</form>
		</Form>
	)
}

export default SearchHomePage
