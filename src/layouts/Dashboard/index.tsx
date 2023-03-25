import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Flex, IconButton } from "@chakra-ui/react"
import { List as MenuIcon } from "phosphor-react"

import { MenuStatus } from "~/interfaces"
import { sideMenuItems } from "~/router/routes"
import { useWindowWidth } from "~/hooks"
import {
	DashboardFlexContainer,
	DashboardMenuListContainer,
	DashboardOutletContainer,
	DashboardSideMenuContainer,
} from "~/layouts/Dashboard/styles"
import { SideMenuItem } from "~/layouts/Dashboard/components"

const CONTENT_HORIZONTAL_GAP = 40
const EXPANDED_MENU_MAX_WIDTH = 640

export function DashboardLayout() {
	const { pathname } = useLocation()
	const sideMenuRef = useRef<HTMLDivElement>(null)
	const { width } = useWindowWidth()
	const [menuStatus, setMenuStatus] = useState<MenuStatus>("expanded")
	const [sideMenuWidth, setSideMenuWidth] = useState<number>()

	const isWindowWidthSmall: boolean = width <= EXPANDED_MENU_MAX_WIDTH

	/** TO DO: Transform side menu into a top menu when screen is small. */

	useEffect(() => {
		setSideMenuWidth(sideMenuRef?.current?.offsetWidth)
	}, [menuStatus])

	useEffect(() => {
		if (isWindowWidthSmall) {
			setMenuStatus("collapsed")
		}
	}, [isWindowWidthSmall])

	const toggleMenuStatus = () => {
		setMenuStatus((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
	}

	return (
		<DashboardFlexContainer>
			<DashboardSideMenuContainer ref={sideMenuRef}>
				{!isWindowWidthSmall && (
					<Flex mb={5}>
						<IconButton
							background="none"
							aria-label="menu"
							_hover={{ background: "none" }}
							icon={<MenuIcon size={18} cursor="pointer" />}
							onClick={toggleMenuStatus}
						/>
					</Flex>
				)}

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
