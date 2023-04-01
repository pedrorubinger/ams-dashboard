export type TableRowActionType =
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