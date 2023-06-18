import React from "react"
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"

import { PartnerReportDetailsModalProps } from "~/interfaces"
import { TableWrapper } from "~/components"

export const PartnerReportDetailsModal: React.FC<
	PartnerReportDetailsModalProps
> = ({ isVisible, title, mode, partners, onClose }) => {
	const isUpToDateMode = mode === "UP-TO-DATE"
	const isArrear = mode === "ARREAR"

	return (
		<Modal
			isOpen={isVisible}
			size="xl"
			scrollBehavior="inside"
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Text>{title}</Text>
				</ModalHeader>

				<ModalCloseButton />

				<ModalBody>
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
				</ModalBody>

				<ModalFooter>
					<Button
						title="Clique para fechar este modal"
						colorScheme="ghost"
						color="black"
						mr={3}
						onClick={onClose}
					>
						Fechar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
