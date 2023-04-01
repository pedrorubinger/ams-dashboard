import React, { useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import { Tenant } from "~/interfaces"
import { dateFormatter } from "~/utils"
import { columns } from "~/pages/Tenants/components/Table/utils"
import {
	TablePaginationSkeleton,
	TableStatus,
	TableWrapper,
} from "~/components"

interface Props {}

const data: Tenant[] = [
	{
		id: "1",
		name: "APAE Barão de Cocais",
		responsible: "Andréa Maria dos Santos Souza e Silva",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "2",
		name: "APAE Santa Bárbara",
		responsible: "Jussara Costa dos Santos",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "3",
		name: "APAE Catas Altas",
		responsible: "Leonício Roberto Castolo Abraão",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "4",
		name: "APAE São Gonçalo",
		responsible: "Elson José Luís Teixeira da Silva Júnior",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "5",
		name: "APAE Santa Bárbara",
		responsible: "Jussara Costa dos Santos",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "6",
		name: "APAE Catas Altas",
		responsible: "Leonício Roberto Castolo Abraão",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "7",
		name: "APAE São Gonçalo",
		responsible: "Elson José Luís Teixeira da Silva Júnior",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "8",
		name: "APAE Santa Bárbara",
		responsible: "Jussara Costa dos Santos",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "9",
		name: "APAE Catas Altas",
		responsible: "Leonício Roberto Castolo Abraão",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		id: "10",
		name: "APAE São Gonçalo",
		responsible: "Elson José Luís Teixeira da Silva Júnior",
		updatedAt: new Date(),
		createdAt: new Date(),
	},
]

export const TenantsTable: React.FC<Props> = () => {
	const [isLoading, setIsLoading] = useState(false)
	const count = data?.length
	let counter = count

	const replicateMockedData = () => {
		const lastThreeItems = data.slice(-3)
		const replicatedItems = lastThreeItems.map((item) => ({
			...item,
			id: String(++counter),
		}))

		return replicatedItems
	}

	const onClickToGetMore = () => {
		setIsLoading(true)

		setTimeout(() => {
			data.push(...replicateMockedData())
			setIsLoading(false)
		}, 3500)
	}

	return (
		<TableWrapper>
			<Table variant="striped">
				<TableStatus
					count={count}
					total={19}
					isLoading={isLoading}
					onClickToGetMore={onClickToGetMore}
				/>

				<Thead>
					<Tr>
						{columns.map((column) => {
							return <Th key={column.id}>{column.label}</Th>
						})}
					</Tr>
				</Thead>

				<Tbody width="100%">
					{data.map((record) => {
						return (
							<Tr key={record.id}>
								<Td>{record.name}</Td>
								<Td>{record.responsible}</Td>
								<Td>{dateFormatter.format(record.createdAt)}</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>

			{!!isLoading && <TablePaginationSkeleton />}
		</TableWrapper>
	)
}
