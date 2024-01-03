import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

type Props = {
	count?: number
	type?: "row" | "column"
}

const CardLoading = (props: Props) => {
	const { count, type = "column" } = props

	const renderArray: any[] = new Array(count).fill(null)

	return (
		<>
			{renderArray.map((_, index) => (
				<Card
					key={index}
					className={type === "row" ? "grid grid-cols-4" : ""}>
					<CardHeader className={type === "row" ? "col-span-1" : ""}>
						<Skeleton className="w-full h-[120px] rounded-lg" />
					</CardHeader>
					<CardContent
						className={
							"flex flex-col gap-4" + (type === "row" ? " col-span-3 pt-6" : "")
						}>
						<Skeleton className="w-[140px] h-[20px] rounded-full" />
						<Skeleton className="w-full h-[20px] rounded-full" />
						<Skeleton className="w-full h-[20px] rounded-full" />
						<Skeleton className="w-[200px] h-[20px] rounded-full" />
					</CardContent>
				</Card>
			))}
		</>
	)
}

export default CardLoading
