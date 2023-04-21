/* eslint-disable import/named */
import styled from "styled-components"
import { Flex, FlexProps } from "@chakra-ui/react"

interface Props extends FlexProps {}

export const ReportsContainer = styled(Flex).attrs(() => ({
	gap: "0 20px",
}))<Props>`
	@media (max-width: 1200px) {
		flex-direction: column;
	}
`
