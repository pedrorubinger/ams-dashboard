import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Flex, IconButton } from "@chakra-ui/react"
import { List as MenuIcon } from "phosphor-react"

import { MenuStatus } from "~/interfaces"
import { sideMenuItems } from "~/router/routes"
import { SideMenuItem } from "~/layouts/Dashboard/components"
import {
	DashboardFlexContainer,
	DashboardMenuListContainer,
	DashboardOutletContainer,
	DashboardSideMenuContainer,
} from "~/layouts/Dashboard/styles"

const CONTENT_HORIZONTAL_GAP = 40

export function DashboardLayout() {
	const { pathname } = useLocation()
	const sideMenuRef = useRef<HTMLDivElement>(null)
	const [menuStatus, setMenuStatus] = useState<MenuStatus>("expanded")
	const [sideMenuWidth, setSideMenuWidth] = useState<number>()

	useEffect(() => {
		setSideMenuWidth(sideMenuRef?.current?.offsetWidth)
	}, [menuStatus])

	const toggleMenuStatus = () => {
		setMenuStatus((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
	}

	return (
		<DashboardFlexContainer>
			<DashboardSideMenuContainer ref={sideMenuRef}>
				<Flex mb={5}>
					<IconButton
						background="none"
						aria-label="menu"
						_hover={{ background: "none" }}
						icon={<MenuIcon size={18} cursor="pointer" />}
						onClick={toggleMenuStatus}
					/>
				</Flex>

				{/* ITEMS */}
				<DashboardMenuListContainer>
					{sideMenuItems.map(({ id, path, ...rest }) => (
						<SideMenuItem
							key={id}
							id={id}
							path={path}
							active={pathname === path}
							menuStatus={menuStatus}
							{...rest}
						/>
					))}
				</DashboardMenuListContainer>
			</DashboardSideMenuContainer>

			<DashboardOutletContainer
				ml={`calc(${sideMenuWidth || 0}px + ${CONTENT_HORIZONTAL_GAP}px)`}
				mr={`${CONTENT_HORIZONTAL_GAP}px`}
			>
				<Outlet />
			</DashboardOutletContainer>
		</DashboardFlexContainer>
	)
}
