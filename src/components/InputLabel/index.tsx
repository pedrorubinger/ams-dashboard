// eslint-disable-next-line import/named
import { FormLabel, FormLabelProps } from "@chakra-ui/react"
import React from "react"

export const InputLabel: React.FC<FormLabelProps> = ({ children, ...rest }) => {
	return (
		<FormLabel color="blackAlpha.600" fontSize="sm" {...rest}>
			{children}
		</FormLabel>
	)
}
