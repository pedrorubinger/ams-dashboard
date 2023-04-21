/* eslint-disable import/named */
import React from "react"
import { Tooltip as ChakraUITooltip, TooltipProps } from "@chakra-ui/react"
import { Question } from "phosphor-react"

interface Props extends Partial<TooltipProps> {
	label: string
}

export const Tooltip: React.FC<Props> = ({ label, ...props }) => {
	return (
		<ChakraUITooltip label={label} {...props}>
			<Question />
		</ChakraUITooltip>
	)
}
