import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
	id: string
	title: string
	titleLink?: string
	titleClassName?: string
	sectionClassName?: string
	children: React.ReactNode
}

const SectionPage = (props: Props) => {
	const { id, title, titleLink, titleClassName, sectionClassName, children } =
		props

	return (
		<section
			className={cn("flex flex-col gap-10", sectionClassName)}
			id={id}>
			<h2 className={cn("text-3xl font-bold text-center", titleClassName)}>
				{titleLink ? <Link href={titleLink}>{title}</Link> : title}
			</h2>

			{children}
		</section>
	)
}

export default SectionPage
