import { dateFormatter, transformDateToISO } from "~/utils"

export const formatPlainDateToBr = (value: string) =>
	dateFormatter.format(new Date(transformDateToISO(value)))
