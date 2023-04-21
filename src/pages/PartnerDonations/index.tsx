import React, { useCallback, useEffect, useState } from "react"
import { Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { PartnerDonationSearchValues as SearchValues } from "~/interfaces"
import { useIsMounted } from "~/hooks"
import { ReportsSection } from "~/pages/PartnerDonations/styles"
import {
	ReportCardsSkeleton,
	PartnerDonationsReport,
	ReportsDateFilter,
	SearchPartnerDonationSchema,
} from "~/pages/PartnerDonations/components"
import { ContentSection, PageTitle } from "~/components"

interface Props {}

export const PartnerDonations: React.FC<Props> = () => {
	const form = useForm<SearchValues>({
		defaultValues: { date: "" },
		resolver: yupResolver(SearchPartnerDonationSchema),
	})
	const isMounted = useIsMounted()
	const [isFetching, setIsFetching] = useState(false)
	const isLoading = !isMounted() || isFetching

	const fetchRecords = useCallback(async (values?: SearchValues) => {
		setIsFetching(true)
		console.log("fetchRecords > values:", values)

		setTimeout(() => {
			setIsFetching(false)
		}, 3000)
	}, [])

	useEffect(() => {
		void fetchRecords()
	}, [fetchRecords])

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

				<FormProvider {...form}>
					<ReportsDateFilter
						isLoading={isLoading}
						fetchRecords={fetchRecords}
					/>
				</FormProvider>
			</ContentSection>

			<ReportsSection>
				{!!isLoading && <ReportCardsSkeleton />}
				{!isLoading && <PartnerDonationsReport />}
			</ReportsSection>
		</>
	)
}
