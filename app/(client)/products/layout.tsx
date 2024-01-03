"use client"

import { useParams } from "next/navigation"
import { useProductsAPI } from "@/app/(client)/hooks/api"
import Breadcrumbs from "@/app/(client)/components/breadcrumb"

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
	const params = useParams()
	const { productDetail, isLoadingProductDetail } = useProductsAPI()

	return (
		<div className="flex flex-col gap-10">
			<Breadcrumbs
				title="Produk Kami"
				params_id={params?.id}
				isLoading={isLoadingProductDetail}
				productDetail={productDetail}
			/>

			{children}
		</div>
	)
}

export default ProductLayout
