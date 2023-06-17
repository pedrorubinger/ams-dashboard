import React from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import { Donation, DonationCategoryLabel as CategoryLabel } from "~/interfaces"
import { partnerDonationColumns as columns } from "~/pages/Partners/utils"
import { TablePaginationSkeleton, TableWrapper } from "~/components"
import { dateFormatter, priceFormatter } from "~/utils"

interface Props {
	records: Donation[]
	isLoading: boolean
}

export const DonationListTable: React.FC<Props> = ({
	records = [],
	isLoading,
}) => {
	if (!records.length) return null

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
						const incomeDate = new Date(record.incomeDate)
						const category = CategoryLabel[record.category] as string
						const monthValues = record.billingDate.join(", ")
						const value = priceFormatter.format(record.value / 100)

						return (
							<Tr key={record.id} _hover={{ background: "blackAlpha.50" }}>
								<Td>{category}</Td>
								<Td>{monthValues.toString()}</Td>
								<Td>{value}</Td>
								<Td>{dateFormatter.format(createdAt)}</Td>
								<Td>{dateFormatter.format(incomeDate)}</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
