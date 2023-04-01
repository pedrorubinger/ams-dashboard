import { Flex, IconButton } from "@chakra-ui/react"

import { TableRowAction } from "~/interfaces"
import { getTableRowActionsBtnProps } from "~/components/Table/TableRowActions/utils"

interface Props {
	actions: TableRowAction[]
}

export const TableRowActions: React.FC<Props> = ({ actions }) => {
	return (
		<Flex gap={4}>
			{actions.map(({ type, title, isDisabled, onClick }) => {
				const { icon, ariaLabel, bg } = getTableRowActionsBtnProps(type)

				return (
					<IconButton
						key={type}
						title={title}
						isDisabled={isDisabled}
						color="white"
						icon={icon}
						aria-label={ariaLabel}
						background={bg}
						_hover={{ background: `${bg.split(".")[0]}.400` }}
						onClick={onClick}
					/>
				)
			})}
		</Flex>
	)
}
