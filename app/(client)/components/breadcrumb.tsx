import Link from "next/link"
import { usePathname } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
	title?: string
	params_id?: string | string[]
	isLoading?: boolean
	productDetail?: {
		productName: string
		productImage: string
	}
}

const BreadcrumbsLink = ({ params_id, isLoading, productDetail }: Props) => {
	const paths = usePathname()
	const pathName = paths.split("/").filter((path) => path)

	if (isLoading) return <Skeleton className="w-[600px] h-[14px] rounded-full" />

	return (
		<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
			<li className="inline-flex items-center">
				<Link
					href="/"
					className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
					<svg
						className="w-3 h-3 me-2.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
					</svg>
					Beranda
				</Link>
			</li>

			{pathName.map((path, index) => {
				const currentPage = index === pathName.length - 1
				const pathNames = `/${pathName.slice(0, index + 1).join("/")}`
				const capitalizePath =
					path[0].toUpperCase() + path.slice(1, path.length)

				return (
					<li
						aria-current={currentPage ? "page" : undefined}
						key={path}>
						<div className="flex items-center">
							<svg
								className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
							{currentPage ? (
								<span className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
									{currentPage && params_id
										? productDetail?.productName
										: capitalizePath}
								</span>
							) : (
								<Link
									href={pathNames}
									className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
									{currentPage && params_id
										? productDetail?.productName
										: capitalizePath}
								</Link>
							)}
						</div>
					</li>
				)
			})}
		</ol>
	)
}

const Breadcrumbs = ({ title, params_id, isLoading, productDetail }: Props) => {
	if (params_id)
		return (
			<BreadcrumbsLink
				params_id={params_id}
				productDetail={productDetail}
				isLoading={isLoading}
			/>
		)

	return (
		<div className="flex flex-col w-full border rounded-lg p-10">
			{params_id && isLoading ? (
				<div className="flex flex-col gap-4">
					<Skeleton className="w-[300px] h-[30px] rounded-full" />
					<Skeleton className="w-[600px] h-[30px] rounded-full" />
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold">
						{params_id ? productDetail?.productName : title}
					</h1>

					<BreadcrumbsLink
						params_id={params_id}
						productDetail={productDetail}
						isLoading={isLoading}
					/>
				</div>
			)}
		</div>
	)
}

export default Breadcrumbs
