import React, { useContext, useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import { PartnerContext } from "~/contexts"
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
	actionItems: TableActionMenuItem[]
	onAddNewDonation: (partner: PartnerRecord) => void
	onViewDonationList: (partner: PartnerRecord) => void
	onUpdatePartner: (record: PartnerRecord) => void
	onDeletePartner: (partner: PartnerRecord) => void
}

export const PartnersTable: React.FC<Props> = ({
	actionItems,
	onAddNewDonation,
	onViewDonationList,
	onUpdatePartner,
	onDeletePartner,
}) => {
	const { user } = useUserStore()
	const { pagination, isFetching, records, fetchPartners } =
		useContext(PartnerContext)
	const [isPaginating, setIsPaginating] = useState(false)
	const isTableBodyVisible: boolean = isFetching ? isPaginating : true
	const count = records?.length || 0
	const total = pagination?.total || count

	const getActions = (record: PartnerRecord): TableRowAction[] => {
		const isDisabled = user?.id === record.id

		return [
			{
				type: "records",
				title: "Visualizar lançamentos deste associado",
				isDisabled,
				onClick: () => onViewDonationList(record),
			},
			{
				type: "create",
				title: "Realizar novo lançamento para este associado",
				isDisabled,
				onClick: () => onAddNewDonation(record),
			},
			{
				type: "edit",
				title: "Atualizar os dados deste associado",
				isDisabled,
				onClick: () => onUpdatePartner(record),
			},
			{
				type: "delete",
				title: "Excluir este associado",
				isDisabled,
				onClick: () => onDeletePartner(record),
			},
		]
	}

	const onClickToGetMore = async () => {
		setIsPaginating(true)
		await fetchPartners({ hasPagination: true, startAt: pagination?.lastKey })
		setIsPaginating(false)
	}

	return (
		<TableWrapper>
			<TableActionsMenu items={actionItems} isDisabled={isFetching} />

			<Table>
				<TableStatus
					count={count}
					total={total}
					isLoading={isFetching}
					onClickToGetMore={() => void onClickToGetMore()}
				/>

				<Thead>
					<Tr>
						{columns.map((column) => {
							return <Th key={column.id}>{column.label}</Th>
						})}
					</Tr>
				</Thead>

				{!!isTableBodyVisible && (
					<Tbody width="100%">
						{records.map((record) => {
							return (
								<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
									<Td>{record.registrationId}</Td>
									<Td>{record.name}</Td>
									<Td>{dateFormatter.format(new Date(record.createdAt))}</Td>
									<Td>
										<TableRowActions actions={getActions(record)} />
									</Td>
								</Tr>
							)
						})}
					</Tbody>
				)}
			</Table>

			{!!isFetching && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
