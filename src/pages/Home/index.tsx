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
				Utilize o menu lateral para navegar pelo sistema. Uma seção de&nbsp;
				<strong>Ajuda</strong> estará disponível em breve! <br /> Algumas das
				funcionalidades ainda estão em desenvolvimento.
			</Text>
		</ContentSection>
	)
}
