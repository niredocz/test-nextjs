export type TProductsList = Array<TProductDetail>

export type TProductDetail = {
	id: string
	createdAt: string
	product: string
	productName: string
	productPrice: string
	productDescription: string
	productImage: string
}

export type TFilter = {
	page: number
	search: string | undefined
	limit: number | undefined
	status: "active" | "inactive"
	type: "buy" | "rent" | undefined
	city: string | undefined
}