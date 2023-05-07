import React from "react"
import { Table, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import {
	PartnerDonationBillingMonthLabel as BillingMonthLabel,
	PartnerDonationBillingMonth as BillingMonth,
	PartnerDonationPerMonth,
	PartnerDonationBillingMonthStatusLabel,
	PartnerDonationBillingMonthStatus,
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
						const value: string = priceFormatter.format(record.value / 100)
						const status = PartnerDonationBillingMonthStatusLabel[record.status]
						const statusColor =
							status === PartnerDonationBillingMonthStatusLabel.DONE
								? "green"
								: "orange"

						return (
							<Tr key={record.month} _hover={{ background: "blackAlpha.50" }}>
								<Td>{record.billingLabel}</Td>
								<Td>{value}</Td>
								<Td>
									<Tag colorScheme={statusColor}>{status}</Tag>
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
