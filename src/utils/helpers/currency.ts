export const priceFormatter = new Intl.NumberFormat("pt-BR", {
	currency: "BRL",
	style: "currency",
})

enum Currencies {
	"BRL" = "R$",
}

export const convertCurrencyToNumber = (
	value: string,
	currency = Currencies.BRL
): number => {
	const numberValue = parseFloat(
		value.replace(currency, "").replace(".", "").replace(",", ".")
	)

	return numberValue
}
