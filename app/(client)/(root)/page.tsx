import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

import SearchHomePage from "@/app/(client)/(root)/components/Search"
import SectionPage from "@/app/(client)/(root)/components/SectionPage"
import ProductListPage from "@/app/(client)/(root)/components/productList"

export default function HomePage() {
	return (
		<div className="flex flex-col gap-20">
			<section
				className="bg-blue-300 dark:bg-slate-300 rounded-xl"
				id="hero">
				<div className="px-10 max-w-screen-xl py-24 lg:py-32 lg:max-w-screen-md">
					<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
						We invest in the world’s potential
					</h1>
					<p className="mb-8 text-lg font-normal lg:text-xl">
						Here at Flowbite we focus on markets where technology, innovation,
						and capital can unlock long-term value and drive economic growth.
					</p>

					<SearchHomePage />
				</div>
			</section>

			<SectionPage
				id="product-category"
				title="Kategori Produk">
				<div className="grid grid-cols-4 gap-4">
					<div className="flex flex-col w-full min-h-[200px] border rounded-lg col-span-2 row-span-2 p-8 bg-blue-100">
						<div className="text-xl mt-auto">Kursi Roda Standard Ruji</div>
						<div className="text-sm text-slate-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vero
							officiis! Ratione maiores sed, expedita iste, veniam quia
							sapiente, et ut enim labore impedit voluptate.
						</div>
						<Button
							variant="default"
							className="flex gap-2 items-center w-fit mt-4">
							<span>Get Started</span>
							<ArrowRight size={16} />
						</Button>
					</div>
					<div className="flex flex-col w-full min-h-[200px] rounded-lg border col-span-2 p-8 bg-blue-100">
						<div className="text-xl mt-auto">Kursi Roda Standard Ruji</div>
						<div className="text-sm text-slate-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vero
							officiis! Ratione maiores sed, expedita iste, veniam quia
							sapiente, et ut enim labore impedit voluptate.
						</div>
						<Button
							variant="default"
							className="flex gap-2 items-center w-fit mt-4">
							<span>Get Started</span>
							<ArrowRight size={16} />
						</Button>
					</div>
					<div className="flex flex-col w-full min-h-[200px] rounded-lg border p-8 bg-blue-100">
						<div className="text-xl mt-auto">Kursi Roda Standard Ruji</div>
						<div className="text-sm text-slate-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vero
							officiis! Ratione maiores sed, expedita iste, veniam quia
							sapiente, et ut enim labore impedit voluptate.
						</div>
						<Button
							variant="default"
							className="flex gap-2 items-center w-fit mt-4">
							<span>Get Started</span>
							<ArrowRight size={16} />
						</Button>
					</div>
					<div className="flex flex-col w-full min-h-[200px] rounded-lg border p-8 bg-blue-100">
						<div className="text-xl mt-auto">Kursi Roda Standard Ruji</div>
						<div className="text-sm text-slate-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vero
							officiis! Ratione maiores sed, expedita iste, veniam quia
							sapiente, et ut enim labore impedit voluptate.
						</div>
						<Button
							variant="default"
							className="flex gap-2 items-center w-fit mt-4">
							<span>Get Started</span>
							<ArrowRight size={16} />
						</Button>
					</div>
				</div>
			</SectionPage>

			<SectionPage
				id="product-list"
				title="Produk Kami"
				titleLink="/products"
				titleClassName="text-start underline">
				<ProductListPage />
			</SectionPage>
		</div>
	)
}
