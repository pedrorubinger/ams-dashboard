import React from "react"

export interface TableActionMenuItem {
	id: string
	label: string
	title?: string
	Icon?: React.ReactNode
	href?: string
	hrefTarget?: string
	download?: string
	onClick: () => void
}
