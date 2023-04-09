import React from "react"
import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react"
import { CaretDown } from "phosphor-react"

import { TableActionMenuItem } from "~/interfaces"

interface Props {
	items: TableActionMenuItem[]
	/** @default false */
	isDisabled?: boolean
}

export const TableActionsMenu: React.FC<Props> = ({
	items,
	isDisabled = false,
}) => {
	if (!items.length) return null

	return (
		<Box mb={8}>
			<Menu>
				<MenuButton
					as={Button}
					rightIcon={<CaretDown />}
					aria-label="Ações"
					title="Clique para ver as opções"
					fontSize="smaller"
					color="white"
					bg="green.300"
					_hover={{ background: "green.500" }}
					_expanded={{ bg: "green.400" }}
					isDisabled={isDisabled}
				>
					Ações
				</MenuButton>

				<MenuList>
					{items.map((item) => {
						return (
							<MenuItem
								_hover={{ background: "green.50" }}
								key={item.id}
								title={item?.title}
								onClick={item.onClick}
							>
								{item?.Icon}
								<Text ml={2}>{item.label}</Text>
							</MenuItem>
						)
					})}
				</MenuList>
			</Menu>
		</Box>
	)
}

TableActionsMenu.defaultProps = {
	isDisabled: false,
}
