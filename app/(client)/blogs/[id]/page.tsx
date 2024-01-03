"use client"

import { useParams } from "next/navigation"
import React from "react"

const BlogDetailPage = () => {
	const params = useParams()

	return (
		<div>
			<h1>Blog Detail Page</h1>
			<h1>Blog ID: {params.id}</h1>
		</div>
	)
}

export default BlogDetailPage
