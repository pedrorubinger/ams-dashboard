/* eslint-disable import/named */
import styled from "styled-components"
import { Flex, FlexProps } from "@chakra-ui/react"

interface Props extends FlexProps {
	hasFilter: boolean
}

export const ReportsSection = styled(Flex).attrs(() => ({
	gap: "0 15px",
}))<Props>`
	@media (max-width: ${({ $hasFilter }) => ($hasFilter ? 1400 : 1200)}px) {
		flex-direction: column;
		margin-bottom: 15px;
	}

	width: 100%;
`
