import React, { useEffect, useState } from "react"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import {
	PartnerReportDetailsDrawerFilterProps,
	PartnerReportDetailsDrawerProps,
	PartnerReportRecord,
} from "~/interfaces"
import { InputLabel, TableWrapper } from "~/components"

const LIMIT_TO_SHOW_INPUT = 3

export const PartnerReportDetailsDrawer: React.FC<
	PartnerReportDetailsDrawerProps
> = ({ isVisible, title, mode, partners = [], onClose }) => {
	const [records, setRecords] = useState<PartnerReportRecord[]>(partners)
	const isUpToDateMode = mode === "UP-TO-DATE"
	const isArrear = mode === "ARREAR"
	const {
		register,
		setValue,
		formState: { errors },
	} = useForm<PartnerReportDetailsDrawerFilterProps>()

	const onFilterPartner = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		setValue("name", value)

		if (!value) {
			setRecords(partners)
		}

		setRecords(() =>
			partners.filter((record) =>
				record.name.toUpperCase().includes(value.toUpperCase())
			)
		)
	}

	useEffect(() => {
		setRecords(partners)
	}, [partners])

	return (
		<Drawer isOpen={isVisible} onClose={onClose} size="xl">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{title}</DrawerHeader>

				<DrawerBody>
					{partners.length >= LIMIT_TO_SHOW_INPUT && (
						<FormControl mt={5} width="md">
							<InputLabel htmlFor="name">Filtrar por nome</InputLabel>

							<InputGroup>
								<Input
									type="text"
									id="name"
									size="sm"
									placeholder="Nome do associado"
									{...register("name")}
									onChange={onFilterPartner}
								/>
							</InputGroup>

							<FormErrorMessage>
								{!!errors.name && errors.name.message}
							</FormErrorMessage>
						</FormControl>
					)}

					{!!isUpToDateMode && (
						<TableWrapper>
							<Table>
								<Thead>
									<Tr>
										<Th>Matrícula</Th>
										<Th>Nome</Th>
									</Tr>
								</Thead>

								<Tbody>
									{!!records &&
										records.map((partner) => {
											return (
												<Tr
													key={partner.id}
													_hover={{ background: "blackAlpha.50" }}
												>
													<Td>{partner.registrationId}</Td>
													<Td>{partner.name}</Td>
												</Tr>
											)
										})}
								</Tbody>
							</Table>
						</TableWrapper>
					)}

					{!!isArrear && (
						<TableWrapper>
							<Table>
								<Thead>
									<Tr>
										<Th>Matrícula</Th>
										<Th>Nome</Th>
										<Th>Atrasos</Th>
									</Tr>
								</Thead>

								<Tbody>
									{!!records &&
										records.map((partner) => {
											const arrears = partner.arrears.join(", ")?.toString()

											return (
												<Tr
													key={partner.id}
													_hover={{ background: "blackAlpha.50" }}
												>
													<Td>{partner.registrationId}</Td>
													<Td>{partner.name}</Td>
													<Td>{arrears}</Td>
												</Tr>
											)
										})}
								</Tbody>
							</Table>
						</TableWrapper>
					)}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}
