export const dateFormatter = new Intl.DateTimeFormat("pt-BR")

export const getDateFormatter = (
	options?: Intl.DateTimeFormatOptions | undefined
) => new Intl.DateTimeFormat("pt-BR", options)

export const transformDateToISO = (dateString: string): string => {
	const date = new Date(dateString)
	const offsetMinutes = date.getTimezoneOffset()
	const offsetMilliseconds = offsetMinutes * 60 * 1000
	const isoString = new Date(date.getTime() + offsetMilliseconds).toISOString()

	return isoString
}
