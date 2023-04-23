import React from "react"
import {
	Box,
	Button,
	Link,
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
	/** @default 8 */
	mb?: number
}

export const TableActionsMenu: React.FC<Props> = ({
	items,
	isDisabled = false,
	mb = 8,
}) => {
	if (!items.length) return null

	return (
		<Box mb={mb}>
			<Menu>
				<MenuButton
					as={Button}
					rightIcon={<CaretDown />}
					aria-label="Ações"
					title="Clique para ver as opções"
					fontSize="smaller"
					size="sm"
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
						const isLink = item?.href

						return (
							<MenuItem
								href={isLink && item?.href}
								as={isLink ? Link : Button}
								_hover={{ background: "green.50" }}
								target={item?.hrefTarget || "_blank"}
								download={item?.download}
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
