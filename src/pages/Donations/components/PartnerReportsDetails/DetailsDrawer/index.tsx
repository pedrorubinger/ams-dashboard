import React from "react"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"

import { PartnerReportDetailsDrawerProps } from "~/interfaces"
import { TableWrapper } from "~/components"

export const PartnerReportDetailsDrawer: React.FC<
	PartnerReportDetailsDrawerProps
> = ({ isVisible, title, mode, partners, onClose }) => {
	const isUpToDateMode = mode === "UP-TO-DATE"
	const isArrear = mode === "ARREAR"

	return (
		<Drawer isOpen={isVisible} onClose={onClose} size="xl">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{title}</DrawerHeader>

				<DrawerBody>
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
									{!!partners &&
										partners.map((partner) => {
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
									{!!partners &&
										partners.map((partner) => {
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
