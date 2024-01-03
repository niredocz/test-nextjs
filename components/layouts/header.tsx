"use client"

import Link from "next/link"
import { topMenu } from "./menu"
import { Button } from "@/components/ui/button"
import useClientStore from "@/hooks/clientStore"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import SelectCity from "../shared/SelectCity"

const Header = () => {
	const { setTheme } = useTheme()
	const setOpenModal = useClientStore((state) => state.setOpenModalLoginClient)

	return (
		<div className="fixed top-0 start-0 z-20 w-full">
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="flex flex-wrap items-center mx-auto max-w-screen-xl p-4">
					<Link
						href="https://flowbite.com"
						className="flex items-center space-x-3 rtl:space-x-reverse mr-4">
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Flowbite
						</span>
					</Link>

					<SelectCity
						isOnHeader
						buttonClassName="max-w-[200px]"
					/>

					<div className="flex items-center space-x-6 rtl:space-x-reverse ml-auto">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="icon">
									<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setTheme("light")}>
									Light
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>
									System
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Link
							href="tel:82335153972"
							className="text-sm  text-gray-500 dark:text-white hover:underline">
							(+62) 823-3515-3972
						</Link>
						<Button
							variant="ghost"
							className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
							onClick={() => setOpenModal(true)}>
							Login
						</Button>
					</div>
				</div>
			</nav>
			<nav className="bg-gray-50 dark:bg-gray-700">
				<div className="max-w-screen-xl px-4 py-3 mx-auto">
					<div className="flex items-center">
						<ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
							{topMenu.map((item) => (
								<li key={item.path}>
									<Link
										href={item.path}
										className="text-gray-900 dark:text-white hover:underline"
										aria-current="page">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
