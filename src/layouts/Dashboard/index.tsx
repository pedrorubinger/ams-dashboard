import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Flex, IconButton } from "@chakra-ui/react"
import { List as MenuIcon } from "phosphor-react"

import { MenuStatus } from "~/interfaces"
import { sideMenuItems } from "~/router/routes"
import { SideMenuItem } from "~/layouts/Dashboard/components"

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
		<Flex py="2.5vh" ml="5" minHeight="100vh">
			<Flex
				pos="fixed"
				h="95vh"
				px="5"
				py="5"
				borderRadius="8"
				boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
				bg="whiteAlpha.800"
				flexDir="column"
				overflow="auto"
				width="fit-content"
				ref={sideMenuRef}
			>
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
				<Flex w="100%" m={0} p={0} flexDir="column" gap="2">
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
				</Flex>
			</Flex>

			<Flex
				h="fit-content"
				px="8"
				py="5"
				borderRadius="8"
				boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
				bg="whiteAlpha.800"
				overflow="auto"
				ml={`calc(${sideMenuWidth || 0}px + ${CONTENT_HORIZONTAL_GAP}px)`}
				mr={`${CONTENT_HORIZONTAL_GAP}px`}
			>
				<Outlet />
			</Flex>
		</Flex>
	)
}
