import React, { useCallback, useEffect, useState } from "react"
import { Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

import { useIsMounted } from "~/hooks"
import { ReportsContainer } from "~/pages/PartnerDonations/styles"
import {
	ReportCardsSkeleton,
	PartnerDonationsReport,
} from "~/pages/PartnerDonations/components"
import { ContentSection, PageTitle } from "~/components"

interface Props {}

export const PartnerDonations: React.FC<Props> = () => {
	const isMounted = useIsMounted()
	const [isFetching, setIsFetching] = useState(false)
	const isLoading = !isMounted() || isFetching

	const fetchData = useCallback(() => {
		setIsFetching(true)

		setTimeout(() => {
			setIsFetching(false)
		}, 3000)
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return (
		<>
			<ContentSection>
				<PageTitle>Contribuições</PageTitle>

				<Text>
					Nesta página você encontra todas as contribuições registradas. Se você
					deseja ver as contribuições de cada associado, acesse a página&nbsp;
					<Link to="/associados" color="primary.400" as={RouterLink}>
						Associados
					</Link>
					.
				</Text>
			</ContentSection>

			<ReportsContainer>
				{!!isLoading && <ReportCardsSkeleton />}
				{!isLoading && <PartnerDonationsReport />}
			</ReportsContainer>
		</>
	)
}
