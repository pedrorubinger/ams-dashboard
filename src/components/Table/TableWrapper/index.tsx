/* eslint-disable import/named */
import React from "react"
import { TableContainer, TableContainerProps } from "@chakra-ui/react"

interface Props extends TableContainerProps {
	children: React.ReactNode
}

export const TableWrapper: React.FC<Props> = ({ children, ...rest }) => {
	return (
		<TableContainer mt="10" mb="4" width="100%" {...rest}>
			{children}
		</TableContainer>
	)
}
