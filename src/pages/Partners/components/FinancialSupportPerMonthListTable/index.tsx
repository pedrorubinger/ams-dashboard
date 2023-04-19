import React from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	PartnerFinancialSupportBillingMonthLabel as BillingMonthLabel,
	PartnerFinancialSupportBillingMonth as BillingMonth,
	PartnerFinancialSupportPerMonth,
} from "~/interfaces"
import { priceFormatter } from "~/utils"
import { financialSupportPerMonthColumns as columns } from "~/pages/Partners/utils"
import { TablePaginationSkeleton, TableWrapper } from "~/components"

interface Props {
	records: PartnerFinancialSupportPerMonth[]
	isLoading: boolean
}

export const FinancialSupportPerMonthListTable: React.FC<Props> = ({
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
						/** TO DO: Add billing year */
						const monthValue = BillingMonth[
							record.month
						] as keyof typeof BillingMonth
						const month = `${BillingMonthLabel[monthValue] as string}`
						const value = priceFormatter.format(record.value / 100)

						return (
							<Tr key={record.month} _hover={{ background: "blackAlpha.50" }}>
								<Td>{month}</Td>
								<Td>{value}</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
