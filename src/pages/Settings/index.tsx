import { Box, Text } from "@chakra-ui/react"

import { SettingsForm } from "~/pages/Settings/components"
import { PageTitle } from "~/components"

export const Settings: React.FC = () => {
	return (
		<Box>
			<PageTitle>Configurações da conta</PageTitle>

			<Text>
				Você pode alterar algumas informações da sua conta. Os campos marcados
				com&nbsp;
				<Text fontWeight="bold" color="red" as="span">
					*
				</Text>
				&nbsp;são de preenchimento obrigatório.
			</Text>

			<Text>
				Por questões de segurança, você deve informar a sua senha atual para
				atualizar qualquer informação.
			</Text>

			<SettingsForm />
		</Box>
	)
}
