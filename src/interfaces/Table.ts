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

export interface TableColumn {
	id: number
	label: string
}

export type TableRowActionType =
	| "records"
	| "edit"
	| "delete"
	| "create"
	| "view"
	| "download"

export interface TableRowAction {
	title: string
	type: TableRowActionType
	/** @default false */
	isDisabled?: boolean
	onClick: () => void
}
