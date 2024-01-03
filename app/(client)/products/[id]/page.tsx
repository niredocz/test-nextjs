"use client"

import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { useProductsAPI } from "@/app/(client)/hooks/api"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const SellingProductDetailPage = () => {
	const {productDetail, isLoadingProductDetail} = useProductsAPI()

	return (
		<div className="grid grid-cols-7 gap-10">
			<div className="col-span-3">
				{isLoadingProductDetail ? (
					<Skeleton className="w-full max-w-[700px] h-[500px] rounded-lg" />
				) : (
					<Image
						loader={() => productDetail?.productImage || ""}
						src={productDetail?.productImage || ""}
						alt={productDetail?.productName || "product-img"}
						width={40}
						height={40}
						className="w-full max-w-[700px] h-[500px] object-cover rounded-lg border"
					/>
				)}
			</div>
			<div className="flex flex-col gap-10 col-span-4">
				{isLoadingProductDetail ? (
					<>
						<Skeleton className="w-[300px] h-[30px] rounded-full" />
						<Skeleton className="w-full h-[30px] rounded-full" />
						<Skeleton className="w-full h-[30px] rounded-full" />
						<Skeleton className="w-full h-[30px] rounded-full" />
					</>
				) : (
					<>
						<h1 className="text-4xl font-semibold">
							{productDetail?.productName}
						</h1>
						<div id="product-pricing">
							<div className="text-lg font-semibold">Harga</div>
							<div className="text-2xl font-semibold text-blue-600">
								Rp. {productDetail?.productPrice || "-"}
							</div>
						</div>
						<Tabs defaultValue="deskripsi">
							<TabsList>
								<TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
								<TabsTrigger value="review">Review</TabsTrigger>
							</TabsList>
							<TabsContent value="deskripsi">
								<div className="">{productDetail?.productDescription}</div>
							</TabsContent>
							<TabsContent value="review">
								<div className="">{productDetail?.productDescription}</div>
							</TabsContent>
						</Tabs>
					</>
				)}
			</div>
		</div>
	)
}

export default SellingProductDetailPage
