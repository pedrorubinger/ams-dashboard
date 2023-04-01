import { Pencil, Trash, Plus, Info, Download } from "phosphor-react"

import { TableRowActionType } from "~/interfaces"

interface GetButtonPropsResponse {
	icon: JSX.Element
	ariaLabel: string
	bg: string
}

export const getTableRowActionsBtnProps = (
	type: TableRowActionType
): GetButtonPropsResponse => {
	switch (type) {
		case "edit":
			return { icon: <Pencil />, ariaLabel: "Editar", bg: "orange.300" }
		case "delete":
			return { icon: <Trash />, ariaLabel: "Excluir", bg: "red.300" }
		case "create":
			return { icon: <Plus />, ariaLabel: "Criar", bg: "green.300" }
		case "view":
			return { icon: <Info />, ariaLabel: "Visualizar", bg: "blue.300" }
		case "download":
			return { icon: <Download />, ariaLabel: "Download", bg: "purple.300" }
	}
}
