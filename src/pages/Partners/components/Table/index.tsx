import React, { useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	TableActionMenuItem,
	TableRowAction,
	PartnerRecord,
} from "~/interfaces"
import { dateFormatter } from "~/utils"
import { useUserStore } from "~/store"
import { columns } from "~/pages/Partners/utils"
import {
	TableActionsMenu,
	TablePaginationSkeleton,
	TableRowActions,
	TableStatus,
	TableWrapper,
} from "~/components"

interface Props {
	isLoading: boolean
	records: PartnerRecord[]
	actionItems: TableActionMenuItem[]
	onAddNewFinancialSupport: (partner: PartnerRecord) => void
	// fetchRecords: () => Promise<void>
	// onClickToUpdatePartner: (record: PartnerRecord) => void
}

export const PartnersTable: React.FC<Props> = ({
	// pagination,
	isLoading,
	records,
	actionItems,
	onAddNewFinancialSupport,
	// fetchRecords,
	// onClickToUpdatePartner,
}) => {
	const { user } = useUserStore()
	const count: number = records?.length

	const getActions = (record: PartnerRecord): TableRowAction[] => {
		const isDisabled = user?.id === record.id

		return [
			{
				type: "view",
				title: "Visualizar lançamentos deste associado",
				isDisabled,
				onClick: () => {},
			},
			{
				type: "create",
				title: "Realizar novo lançamento para este associado",
				isDisabled,
				onClick: () => onAddNewFinancialSupport(record),
			},
			{
				type: "delete",
				title: "Excluir este associado",
				isDisabled,
				onClick: () => {},
			},
		]
	}

	return (
		<TableWrapper>
			<TableActionsMenu items={actionItems} isDisabled={isLoading} />

			<Table>
				<TableStatus count={count} total={count} isLoading={isLoading} />

				<Thead>
					<Tr>
						{columns.map((column) => {
							return <Th key={column.id}>{column.label}</Th>
						})}
					</Tr>
				</Thead>

				<Tbody width="100%">
					{records.map((record) => {
						return (
							<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
								<Td>{record.id}</Td>
								<Td>{record.name}</Td>
								<Td>{dateFormatter.format(new Date(record.createdAt))}</Td>
								<Td>
									<TableRowActions actions={getActions(record)} />
								</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
