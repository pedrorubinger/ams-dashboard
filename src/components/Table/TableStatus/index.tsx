/* eslint-disable import/named */
import React from "react"
import { Button, TableCaption, TableCaptionProps } from "@chakra-ui/react"

interface Props extends TableCaptionProps {
	/** @default 0 */
	count?: number
	/** @default 0 */
	total?: number
	/** @default false */
	isLoading?: boolean
	onClickToGetMore: () => void
}

export const TableStatus: React.FC<Props> = ({
	count = 0,
	total = 0,
	isLoading = false,
	onClickToGetMore,
}) => {
	if (isLoading) return null

	if (!count) {
		return <TableCaption>Não há registros até o momento.</TableCaption>
	}

	const text = `${count} de ${total} registro${
		total === 1 ? "" : "s"
	} encontrado${total === 1 ? "" : "s"}`

	if (count === total) return <TableCaption>{text}</TableCaption>

	return (
		<TableCaption>
			{text}.
			<br />
			Clique
			<Button
				variant="link"
				type="button"
				color="teal.500"
				title="Clique para buscar mais registros"
				onClick={onClickToGetMore}
			>
				aqui
			</Button>
			para buscar mais.
		</TableCaption>
	)
}

TableStatus.defaultProps = {
	isLoading: false,
	count: 0,
	total: 0,
}
