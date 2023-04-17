import React from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	PartnerFinancialSupport,
	PartnerFinancialSupportBillingMonthLabel as BillingMonthLabel,
	PartnerFinancialSupportBillingMonth as BillingMonth,
	PartnerFinancialSupportCategoryLabel as CategoryLabel,
} from "~/interfaces"
import { financialSupportColumns as columns } from "~/pages/Partners/utils"
import {
	TableActionsMenu,
	TablePaginationSkeleton,
	TableRowActions,
	TableStatus,
	TableWrapper,
} from "~/components"
import { dateFormatter, priceFormatter } from "~/utils"

interface Props {
	records: PartnerFinancialSupport[]
	isLoading: boolean
}

export const FinancialSupportListTable: React.FC<Props> = ({
	records,
	isLoading,
}) => {
	return (
		<TableWrapper>
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
						const category = CategoryLabel[record.category] as string
						const monthValue = BillingMonth[
							record.billingMonth
						] as keyof typeof BillingMonth
						const month = BillingMonthLabel[monthValue] as string
						const value = priceFormatter.format(record.value / 100)

						return (
							<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
								<Td>{category}</Td>
								<Td>{month}</Td>
								<Td>{value}</Td>
								<Td>{dateFormatter.format(new Date(record.createdAt))}</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
