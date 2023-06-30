import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { PartnerReportDetailsModalProps } from "~/interfaces"
import { ContentSection, Tooltip } from "~/components"
import { usePartnerReports } from "~/pages/Donations/hooks"
import {
	ReportsSection,
	PartnerReportsDetailsButton,
	PartnerReportDetailsModal,
} from "~/pages/Donations/components"

interface Props {}

interface DetailsModal
	extends Pick<PartnerReportDetailsModalProps, "title" | "mode" | "partners"> {}

export const PartnerReports: React.FC<Props> = () => {
	const { arrearsPartners, partners, upToDatePartners } = usePartnerReports()
	const [detailsModal, setDetailsModal] = useState<DetailsModal | null>(null)

	const getUpdateToDatePartnersLabel = () => {
		const length = upToDatePartners?.length

		return (
			<>
				{length || 0} associado(s).
				{!!length && (
					<>
						&nbsp;
						<PartnerReportsDetailsButton
							onClick={() =>
								setDetailsModal({
									title: "Associados com pagamentos em dia",
									mode: "UP-TO-DATE",
									partners: upToDatePartners,
								})
							}
						/>
					</>
				)}
			</>
		)
	}

	const getArrearsPartnersLabel = () => {
		const length = arrearsPartners?.length

		return (
			<>
				{length || 0} associado(s).
				{!!length && (
					<>
						&nbsp;
						<PartnerReportsDetailsButton
							onClick={() =>
								setDetailsModal({
									title: "Associados com pagamentos atrasados",
									mode: "ARREAR",
									partners: arrearsPartners,
								})
							}
						/>
					</>
				)}
			</>
		)
	}

	const onCloseDetailsModal = () => setDetailsModal(null)

	return (
		<>
			{!!detailsModal && (
				<PartnerReportDetailsModal
					title={detailsModal.title}
					mode={detailsModal.mode}
					partners={detailsModal.partners}
					onClose={onCloseDetailsModal}
					isVisible
				/>
			)}

			<Flex flexDirection="column" width="100%">
				<Box mt={8}>
					<Text fontWeight="bold" fontSize={20} color="blackAlpha.700">
						Associados
					</Text>
				</Box>

				<ReportsSection width="100%">
					<ContentSection mt={4}>
						<Flex alignItems="center">
							<Text color="gray.500" fontSize={15}>
								Total
							</Text>
							&nbsp;
							<Tooltip
								label="Total de associados cadastrados"
								placement="top-start"
							/>
						</Flex>

						<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
							{partners?.length ? `${partners.length} associados` : "-"}
						</Text>
					</ContentSection>

					<ContentSection mt={4}>
						<Flex alignItems="center">
							<Text color="gray.500" fontSize={15}>
								Em dia
							</Text>
							&nbsp;
							<Tooltip
								label="Lista de associados em dia, ou seja, sem atrasos de pagamento. São consideradas apenas as contribuições pagas a partir da primeira data de pagamento registrada."
								placement="top-start"
							/>
						</Flex>

						<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
							{getUpdateToDatePartnersLabel()}
						</Text>
					</ContentSection>

					<ContentSection mt={4}>
						<Flex alignItems="center">
							<Text color="gray.500" fontSize={15}>
								Com atraso(s)
							</Text>
							&nbsp;
							<Tooltip
								label="Lista de associados com contribuições não pagas. São consideradas apenas as contribuições não pagas a partir da primeira data de pagamento registrada."
								placement="top-start"
							/>
						</Flex>

						<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
							{getArrearsPartnersLabel()}
						</Text>
					</ContentSection>
				</ReportsSection>
			</Flex>
		</>
	)
}
