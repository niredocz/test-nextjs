"use client"

import { Pagination } from "flowbite-react"
import ProductListPage from "@/app/(client)/(root)/components/productList"
import { useEffect, useState } from "react"
import { useProductsAPI } from "@/app/(client)/hooks/api"
import { useSearchParams } from "next/navigation"
import FilterProducts from "./components/filter-products"
import { GridIcon, ListBulletIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const ProductsPage = () => {
	const searchParams = useSearchParams()
	const { filter, setFilter, productsList } = useProductsAPI()
	const [isColumn, setIsColumn] = useState<boolean>(true)

	const onPageChange = (page: number) => setFilter({ ...filter, page })

	const handleSetIsColumn = (val: boolean) => {
		localStorage.setItem("is_column", String(val))
		setIsColumn(val)
	}

	useEffect(() => {
		localStorage.getItem("is_column") &&
			setIsColumn(JSON.parse(localStorage.getItem("is_column")!))

		setFilter({
			...filter,
			search: searchParams.get("search")!,
			status: searchParams.get("status"),
		})
	}, [searchParams])

	return (
		<div className="flex gap-10">
			<FilterProducts />

			<div className="flex flex-col gap-4 w-full">
				<div className="flex w-full">
					{filter.search && (
						<h1 className="text-xl font-semibold">
							Hasil pencarian: {filter.search}
						</h1>
					)}
					<div className="flex gap-2 ml-auto">
						<Button
							size="icon"
							variant="outline"
							className={isColumn ? "bg-slate-200" : ""}
							onClick={() => handleSetIsColumn(true)}>
							<ListBulletIcon />
						</Button>
						<Button
							size="icon"
							variant="outline"
							className={!isColumn ? "bg-slate-200" : ""}
							onClick={() => handleSetIsColumn(false)}>
							<GridIcon />
						</Button>
					</div>
				</div>
				<ProductListPage
					cols={isColumn ? 3 : 1}
					count={filter.limit}
					type={isColumn ? "column" : "row"}
				/>
				<Pagination
					className="mx-auto"
					currentPage={filter.page}
					totalPages={productsList?.length ?? 0}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	)
}

export default ProductsPage
