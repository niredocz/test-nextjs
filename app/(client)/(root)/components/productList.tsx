"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useProductsAPI } from "@/app/(client)/hooks/api"
import CardLoading from "@/components/shared/CardLoading"

type Props = {
	count?: number
	cols?: number
	type?: "row" | "column"
}

const ProductListPage = (props: Props) => {
	const { count = 8, cols = 4, type = "column" } = props
	const { productsList, productsListLoading } = useProductsAPI()

	return (
		<div className={`grid grid-cols-${cols} gap-4`}>
			{productsListLoading ? (
				<CardLoading
					count={count}
					type={type}
				/>
			) : (
				productsList?.length &&
				productsList.slice(0, count).map((product) => (
					<Card
						key={product?.id}
						className={cn(type !== "column" && "grid grid-cols-4")}>
						<CardHeader
							className={cn("p-2", type !== "column" && "col-span-1")}>
							<Link
								href={`/products/${product?.id}`}
								className="leading-8 rounded-lg overflow-hidden">
								<Image
									width={50}
									height={50}
									loader={() => product?.productImage}
									src={product?.productImage}
									alt={product?.productName || "product-img"}
									className="w-full rounded-lg cursor-pointer hover:scale-105 transition"
								/>
							</Link>
						</CardHeader>
						<CardContent
							className={cn(
								"flex flex-col justify-between p-4",
								type === "column" ? "pt-0" : "col-span-3"
							)}>
							<CardTitle
								className={cn(type === "column" ? "text-base" : "text-lg")}>
								<Link
									href={`/products/${product?.id}`}
									className="leading-8 hover:underline">
									{product?.productName}
								</Link>
							</CardTitle>
							<CardDescription className="text-sm line-clamp-2">
								{product?.productDescription}
							</CardDescription>
							<div
								className={cn(
									"text-black text-xl",
									type === "column" ? "font-medium mt-4" : "font-semibold mt-2"
								)}>
								Rp. {product?.productPrice || "-"}
							</div>
							<div
								className={cn(
									"text-sm text-end text-muted-foreground",
									type === "column" ? "mt-4" : "mt-2"
								)}>
								Colomadu, Karanganyar
							</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	)
}

export default ProductListPage
