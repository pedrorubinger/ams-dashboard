import { useContext, useMemo } from "react"

import { DonationContext, PartnerContext } from "~/contexts"
import { PartnerRecord, PartnerReportRecord } from "~/interfaces"
import { getPartnerPayments } from "~/utils"

interface Response {
	partners: PartnerRecord[]
	records: PartnerReportRecord[]
	upToDatePartners: PartnerReportRecord[]
	arrearsPartners: PartnerReportRecord[]
}

export const usePartnerReports = (): Response => {
	const { records: donations } = useContext(DonationContext)
	const { records: partners } = useContext(PartnerContext)

	const records = useMemo(
		() => getPartnerPayments({ donations, partners }),
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

	return { records, partners, upToDatePartners, arrearsPartners }
}
