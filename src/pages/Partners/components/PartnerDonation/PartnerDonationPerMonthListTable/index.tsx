import React from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	PartnerDonationBillingMonthLabel as BillingMonthLabel,
	PartnerDonationBillingMonth as BillingMonth,
	PartnerDonationPerMonth,
} from "~/interfaces"
import { priceFormatter } from "~/utils"
import { partnerDonationPerMonthColumns as columns } from "~/pages/Partners/utils"
import { TablePaginationSkeleton, TableWrapper } from "~/components"

interface Props {
	records: PartnerDonationPerMonth[]
	isLoading: boolean
}

export const PartnerDonationPerMonthListTable: React.FC<Props> = ({
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
						const billingDate = `${BillingMonthLabel[monthValue] as string}/${
							record.year
						}`
						const value = priceFormatter.format(record.value / 100)

						return (
							<Tr key={record.month} _hover={{ background: "blackAlpha.50" }}>
								<Td>{billingDate}</Td>
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
