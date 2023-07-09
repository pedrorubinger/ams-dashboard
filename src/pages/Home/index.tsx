import { Text } from "@chakra-ui/react"

import { useUserStore } from "~/store"
import { ContentSection, PageTitle } from "~/components"

export const Home: React.FC = () => {
	const { user } = useUserStore()
	const name = user?.name?.split(" ")?.[0] || "usuário"

	return (
		<ContentSection>
			<PageTitle>Olá, {name}!</PageTitle>

			<Text>
				Utilize o menu lateral para navegar pelo sistema. Verifique no fim da
				página se este é um ambiente de testes.
			</Text>
		</ContentSection>
	)
}
