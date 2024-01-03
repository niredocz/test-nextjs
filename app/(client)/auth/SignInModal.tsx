"use client"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useClientStore from "@/hooks/clientStore"
import { useHttpMutation } from "@/plugins/http"

const SignInModal = () => {
	const openModal = useClientStore((state) => state.openModalLoginClient)
	const setOpenModal = useClientStore((state) => state.setOpenModalLoginClient)

	const handleLogin = () => {
		login({
			username: "mor_2314",
			password: "83r5^_",
		})
	}

	const { mutate: login } = useHttpMutation(
		"https://fakestoreapi.com/auth/login",
		{
			axiosOptions: {
				method: "POST",
			},
			mutationOptions: {
				onSuccess: (data) => {
					console.log("login", data)
					setOpenModal(false)
				},
			},
		}
	)

	return (
		<Dialog
			open={openModal}
			onOpenChange={setOpenModal}>
			<DialogContent className="sm:max-w-fit">
				<Tabs
					defaultValue="login"
					className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Register</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<DialogHeader>
							<div className="flex flex-col gap-2 items-center">
								<DialogTitle className="text-2xl font-bold">Login</DialogTitle>
								<DialogDescription>
									Enter your account details below.
								</DialogDescription>
							</div>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-right">
									Username
								</Label>
								<Input
									id="username"
									defaultValue="@peduarte"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="password"
									className="text-right">
									Password
								</Label>
								<Input
									id="password"
									type="password"
									defaultValue="@peduarte"
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<div className="flex flex-col gap-4 items-center justify-center w-full">
								<Button type="button" onClick={handleLogin}>Login</Button>
							</div>
						</DialogFooter>
					</TabsContent>
					<TabsContent value="register">
						<DialogHeader>
							<div className="flex flex-col gap-2 items-center">
								<DialogTitle className="text-2xl font-bold">
									Register
								</DialogTitle>
								<DialogDescription>
									Enter your account details below.
								</DialogDescription>
							</div>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-right">
									Username
								</Label>
								<Input
									id="username"
									defaultValue="@peduarte"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="password"
									className="text-right">
									Password
								</Label>
								<Input
									id="password"
									type="password"
									defaultValue="@peduarte"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="repeat-password"
									className="text-right">
									Repeat Password
								</Label>
								<Input
									id="repeat-password"
									type="password"
									defaultValue="@peduarte"
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<div className="flex flex-col gap-4 items-center justify-center w-full">
								<Button type="submit">Register Account</Button>
							</div>
						</DialogFooter>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}

export default SignInModal
