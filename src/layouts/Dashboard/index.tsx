import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Flex, IconButton } from "@chakra-ui/react"
import { List as MenuIcon } from "phosphor-react"

import { MenuStatus } from "~/interfaces"
import { sideMenuItems } from "~/router/routes"
import { usePermission, useWindowWidth } from "~/hooks"
import {
	DashboardContentContainer,
	DashboardFlexContainer,
	DashboardMenuListContainer,
	DashboardOutletContainer,
	DashboardSideMenuContainer,
} from "~/layouts/Dashboard/styles"
import { DashboardFooter, SideMenuItem } from "~/layouts/Dashboard/components"

const CONTENT_HORIZONTAL_GAP = 40
const EXPANDED_MENU_MAX_WIDTH = 640

export function DashboardLayout() {
	const sideMenuRef = useRef<HTMLDivElement>(null)
	const { items } = usePermission(sideMenuItems)
	const { pathname } = useLocation()
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
							background="gray.50"
							color="blackAlpha.700"
							borderRadius="50%"
							aria-label="menu"
							title="Clique para expandir ou diminuir o menu lateral"
							_hover={{ background: "gray.100" }}
							icon={<MenuIcon size={16} cursor="pointer" />}
							onClick={toggleMenuStatus}
						/>
					</Flex>
				)}

				<DashboardMenuListContainer>
					{items.map(({ id, path, ...rest }) => (
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

			<DashboardContentContainer
				ml={`calc(${sideMenuWidth || 0}px + ${CONTENT_HORIZONTAL_GAP}px)`}
				mr={`${CONTENT_HORIZONTAL_GAP}px`}
			>
				<DashboardOutletContainer>
					<Outlet />
				</DashboardOutletContainer>

				<DashboardFooter />
			</DashboardContentContainer>
		</DashboardFlexContainer>
	)
}
