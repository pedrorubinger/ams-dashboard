import React from "react"

export interface TableActionMenuItem {
	id: string
	label: string
	title?: string
	Icon?: React.ReactNode
	onClick: () => void
}
