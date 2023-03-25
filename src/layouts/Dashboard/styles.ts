import { Flex } from "@chakra-ui/react"
import styled from "styled-components"

export const DashboardFlexContainer = styled(Flex).attrs(() => ({
	py: "2.5vh",
	ml: 5,
	minHeight: "100vh",
}))``

export const DashboardSideMenuContainer = styled(Flex).attrs(() => ({
	pos: "fixed",
	h: "95vh",
	px: 5,
	py: 5,
	borderRadius: 8,
	boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
	bg: "whiteAlpha.800",
	flexDir: "column",
	overflow: "auto",
	width: "fit-content",
}))``

export const DashboardMenuListContainer = styled(Flex).attrs(() => ({
	w: "100%",
	m: 0,
	p: 0,
	flexDir: "column",
	gap: 2,
}))``

export const DashboardOutletContainer = styled(Flex).attrs(() => ({
	h: "fit-content",
	px: 8,
	py: 5,
	borderRadius: 8,
	boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
	bg: "whiteAlpha.800",
	overflow: "auto",
	w: "100%",
}))``
