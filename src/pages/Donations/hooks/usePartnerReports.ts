import { useContext, useMemo } from "react"

import { DonationContext, PartnerContext } from "~/contexts"
import { PartnerReportRecord } from "~/interfaces"
import { getUpToDatePartners } from "~/utils"

interface Response {
	records: PartnerReportRecord[]
	upToDatePartners: PartnerReportRecord[]
	arrearsPartners: PartnerReportRecord[]
}

export const usePartnerReports = (): Response => {
	const { records: donations } = useContext(DonationContext)
	const { records: partners } = useContext(PartnerContext)

	const records = useMemo(
		() => getUpToDatePartners({ donations, partners }),
		[donations, partners]
	)
	const upToDatePartners = useMemo(
		() => records.filter((record) => !record.arrears.length),
		[records]
	)
	const arrearsPartners = useMemo(
		() => records.filter((record) => record.arrears.length),
		[records]
	)

	return { records, upToDatePartners, arrearsPartners }
}
