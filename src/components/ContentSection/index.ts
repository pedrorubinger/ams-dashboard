/* eslint-disable import/named */
import styled from "styled-components"
import { Flex, FlexProps } from "@chakra-ui/react"

interface Props extends FlexProps {}

export const ContentSection = styled(Flex).attrs(() => ({
	h: "fit-content",
	boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
	bg: "whiteAlpha.800",
	overflow: "auto",
	flexDirection: "column",
	px: 10,
	py: 7,
	borderRadius: 8,
}))<Props>`
	width: ${({ width = "100%" }) => width};
`
