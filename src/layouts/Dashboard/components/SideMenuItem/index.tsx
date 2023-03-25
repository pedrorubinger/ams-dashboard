import { Divider, Flex, Link, Text, theme } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { RouteItem as MenuItemProps, MenuStatus } from "~/interfaces"
import { logout } from "~/utils"

interface Props extends MenuItemProps {
	active: boolean
	menuStatus: MenuStatus
}

export const SideMenuItem: React.FC<Props> = ({
	id,
	active,
	Icon,
	label,
	title,
	path,
	menuStatus = "expanded",
}) => {
	const navigate = useNavigate()
	const isMenuExpanded = menuStatus === "expanded"
	const isLogout = id === "logout"

	const onClickItem = () => (isLogout ? logout() : navigate(path))

	return (
		<>
			{!!isLogout && <Divider mt={2} />}
			<Flex w="100%" m={0} p={0}>
				<Link
					backgroundColor={active ? theme.colors.gray[200] : "none"}
					p={3}
					px={isMenuExpanded ? 10 : 3}
					w="100%"
					borderRadius={8}
					_hover={{ textDecor: "none", background: theme.colors.gray[100] }}
					title={title}
					onClick={onClickItem}
				>
					<Flex gap="4">
						<Icon size={18} cursor="pointer" />
						{menuStatus === "expanded" && <Text fontSize="sm">{label}</Text>}
					</Flex>
				</Link>
			</Flex>
		</>
	)
}

SideMenuItem.defaultProps = {
	menuStatus: "expanded",
}
