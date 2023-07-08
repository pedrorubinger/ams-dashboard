/* eslint-disable import/named */
import React from "react"
import { Button, ButtonProps } from "@chakra-ui/react"

interface Props extends ButtonProps {}

export const PartnerReportsDetailsButton: React.FC<Props> = ({ ...rest }) => {
	return (
		<Button variant="link" {...rest}>
			Ver detalhes
		</Button>
	)
}
