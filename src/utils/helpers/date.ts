export const dateFormatter = new Intl.DateTimeFormat("pt-BR")

export const getDateFormatter = (
	options?: Intl.DateTimeFormatOptions | undefined
) => new Intl.DateTimeFormat("pt-BR", options)
