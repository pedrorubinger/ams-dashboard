import styled from "styled-components"
import { Flex } from "@chakra-ui/react"

export const ContentSection = styled(Flex).attrs((props) => ({
	h: "fit-content",
	boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
	bg: "whiteAlpha.800",
	overflow: "auto",
	w: "100%",
	px: 10,
	py: 7,
	borderRadius: 8,
	flexDirection: "column",
}))``
