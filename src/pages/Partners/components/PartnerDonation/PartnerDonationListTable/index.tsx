import React from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	PartnerDonation,
	PartnerDonationBillingMonthLabel as BillingMonthLabel,
	PartnerDonationBillingMonth as BillingMonth,
	PartnerDonationCategoryLabel as CategoryLabel,
} from "~/interfaces"
import { partnerDonationColumns as columns } from "~/pages/Partners/utils"
import {
	TableActionsMenu,
	TablePaginationSkeleton,
	TableRowActions,
	TableStatus,
	TableWrapper,
} from "~/components"
import { dateFormatter, priceFormatter } from "~/utils"

interface Props {
	records: PartnerDonation[]
	isLoading: boolean
}

export const PartnerDonationListTable: React.FC<Props> = ({
	records,
	isLoading,
}) => {
	return (
		<TableWrapper mt={5}>
			<Table>
				<Thead>
					<Tr>
						{columns.map((column) => {
							return <Th key={column.id}>{column.label}</Th>
						})}
					</Tr>
				</Thead>

				<Tbody width="100%">
					{records.map((record) => {
						const createdAt = new Date(record.createdAt)
						const category = CategoryLabel[record.category] as string
						// const monthValue = BillingMonth[
						// 	record.billingMonth
						// ] as keyof typeof BillingMonth
						const monthValue = "in progress" // as keyof typeof BillingMonth
						// const month = `${BillingMonthLabel[monthValue] as string}/${
						// 	record.billingYear
						// }`
						const month = "in progress"
						const value = priceFormatter.format(record.value / 100)

						return (
							<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
								<Td>{category}</Td>
								<Td>{month}</Td>
								<Td>{value}</Td>
								<Td>{dateFormatter.format(createdAt)}</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
