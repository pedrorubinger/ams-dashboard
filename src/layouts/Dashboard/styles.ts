import { Flex } from "@chakra-ui/react"
import styled from "styled-components"

const CONTENT_HEIGHT = "95vh"

export const DashboardFlexContainer = styled(Flex).attrs(() => ({
	py: "2.5vh",
	minHeight: "100vh",
	ml: 5,
}))``

export const DashboardSideMenuContainer = styled(Flex).attrs(() => ({
	pos: "fixed",
	h: CONTENT_HEIGHT,
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

export const DashboardContentContainer = styled(Flex).attrs(() => ({
	flexDirection: "column",
	minHeight: CONTENT_HEIGHT,
}))``

export const DashboardOutletContainer = styled(Flex).attrs(() => ({
	h: "fit-content",
	px: 10,
	py: 5,
	borderRadius: 8,
	boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
	bg: "whiteAlpha.800",
	overflow: "auto",
	w: "100%",
}))``
