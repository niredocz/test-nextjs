import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"

import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import SignInModal from "@/app/(client)/auth/SignInModal"
import MainLayout from "@/app/(client)/main-layout"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Beranda | Sewain Kursi Roda",
	description: "Generated by create next app",
	authors: [
		{
			name: "Daffa Aldzakian Fauzi",
		},
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<MainLayout>
						<Header />
						<main className="min-h-screen max-w-screen-xl mx-auto py-32 px-4">
							{children}
						</main>
						<SignInModal />
						<Footer />
					</MainLayout>
				</ThemeProvider>
			</body>
		</html>
	)
}