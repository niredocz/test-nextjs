import Link from "next/link"

const NotFound = () => {
	return (
		<>
			<div className="min-h-screen">404 | NotFound</div>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</>
	)
}

export default NotFound
