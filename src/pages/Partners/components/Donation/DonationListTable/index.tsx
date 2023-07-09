import React, { useContext, useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	DonationCategoryLabel as CategoryLabel,
	Donation,
	TableRowAction,
	PartnerRecord,
} from "~/interfaces"
import { dateFormatter, getDateFormatter, priceFormatter } from "~/utils"
import { partnerDonationColumns } from "~/pages/Partners/utils"
import {
	TablePaginationSkeleton,
	TableRowActions,
	TableWrapper,
} from "~/components"
import { useDeleteDonationModal } from "~/pages/Partners/hooks/useDeleteDonationModal"

interface Props {
	partner: PartnerRecord
	records: Donation[]
	isLoading: boolean
}

export const DonationListTable: React.FC<Props> = ({
	records = [],
	partner,
	isLoading,
}) => {
	const { Modal: DeleteDonation, onOpen } = useDeleteDonationModal({ partner })

	if (!records.length) return null

	const getActions = (record: Donation): TableRowAction[] => {
		return [
			{
				type: "delete",
				title: "Excluir esta contribuição",
				isDisabled: false,
				onClick: () => onOpen({ id: record.id, value: record.value }),
			},
		]
	}

	return (
		<TableWrapper mt={5}>
			<DeleteDonation />

			<Table>
				<Thead>
					<Tr>
						{partnerDonationColumns.map((column) => {
							return <Th key={column.id}>{column.label}</Th>
						})}
					</Tr>
				</Thead>

				<Tbody width="100%">
					{records.map((record) => {
						const createdAt = getDateFormatter({
							dateStyle: "short",
							timeStyle: "short",
						}).format(new Date(record.createdAt))
						const incomeDate = dateFormatter.format(new Date(record.incomeDate))
						const category = CategoryLabel[record.category] as string
						const monthValues = record.billingDate.join(", ")?.toString()
						const value = priceFormatter.format(record.value / 100)

						return (
							<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
								<Td>{category}</Td>
								<Td>{monthValues}</Td>
								<Td>{value}</Td>
								<Td>{incomeDate}</Td>
								<Td>{createdAt}</Td>
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
