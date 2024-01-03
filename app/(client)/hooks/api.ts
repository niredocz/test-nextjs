import { useHttp } from "@/plugins/http"
import type { TProductDetail, TProductsList, TFilter } from "./types"
// import useClientStore from "@/hooks/clientStore"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export const useProductsAPI = () => {
	const params = useParams()
	const [filter, setFilter] = useState<TFilter>({
		page: 1,
		search: "",
		limit: 9,
		status: "active",
		type: undefined,
		city: undefined
	})

	const productDetailUrl = useMemo(() => {
		return `/products/${params.id}`
	}, [params?.id])

	const { data: productsList, isLoading: productsListLoading } =
		useHttp<TProductsList>("/products", {
			axiosOptions: {
				method: "GET",
			},
			queryOptions: {
				queryKey: ["products", filter.page],
				enabled: !params?.id,
			},
		})

	const {
		data: productDetail,
		isLoading: isLoadingProductDetail,
		isError: isErrorProductDetail,
	} = useHttp<TProductDetail>(productDetailUrl, {
		axiosOptions: {
			method: "GET",
		},
		queryOptions: {
			queryKey: ["product-detail", productDetailUrl],
			enabled: params?.id !== undefined,
		},
	})

	return {
		filter,
		setFilter,
		productsList,
		productsListLoading,
		productDetail,
		isLoadingProductDetail,
		isErrorProductDetail,
	}
}
