import { useState } from "react"
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react"
import { Eye, EyeClosed } from "phosphor-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AccountFormValues as FormValues } from "~/interfaces"
import { useUserStore } from "~/store"
import { AccountSchema } from "~/pages/Settings/components/Form/schema"
import { Form, InputLabel } from "~/components"

export const SettingsForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { user } = useUserStore()
	const defaultValues: FormValues = {
		changePassword: false,
		name: user?.name || "",
		email: user?.email || "",
		password: "",
		newPassword: "",
	}
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(AccountSchema),
		defaultValues,
	})
	const watchedPassword: string = watch("password")
	const watchedNewPassword: string = watch("newPassword")
	const watchedChangePassword: boolean = watch("changePassword")

	const onSubmit = (values: FormValues) => {
		console.log("submitted values:", values)
	}

	return (
		<Box mt="8">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.email} width="md">
					<InputLabel htmlFor="email">Email</InputLabel>

					<Input
						id="email"
						type="email"
						placeholder="Seu email"
						value={defaultValues.email}
						disabled
					/>
				</FormControl>

				<FormControl isInvalid={!!errors.name} mt="5" width="md">
					<InputLabel htmlFor="name">Nome</InputLabel>

					<Input
						id="name"
						type="text"
						placeholder="Seu nome"
						{...register("name")}
					/>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors.password} mt="5" width="md">
					<InputLabel htmlFor="password">Senha</InputLabel>

					<InputGroup>
						<Input
							type={isPasswordVisible ? "text" : "password"}
							id="password"
							placeholder="Sua senha atual"
							{...register("password")}
						/>
						{!!watchedPassword && (
							<InputRightElement width="4.5rem">
								<Button
									h="1.75rem"
									size="sm"
									onClick={() => setIsPasswordVisible((prev) => !prev)}
								>
									{isPasswordVisible ? <EyeClosed /> : <Eye />}
								</Button>
							</InputRightElement>
						)}
					</InputGroup>

					<FormErrorMessage>
						{errors.password && errors.password.message}
					</FormErrorMessage>
				</FormControl>

				{!!watchedChangePassword && (
					<FormControl
						isRequired={watchedChangePassword}
						isInvalid={!!errors.newPassword}
						mt="5"
						width="md"
					>
						<InputLabel htmlFor="newPassword">Nova senha</InputLabel>

						<InputGroup>
							<Input
								type={isNewPasswordVisible ? "text" : "password"}
								id="newPassword"
								placeholder="Sua nova senha"
								{...register("newPassword")}
							/>
							{!!watchedNewPassword && (
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem"
										size="sm"
										onClick={() => setIsNewPasswordVisible((prev) => !prev)}
									>
										{isNewPasswordVisible ? <EyeClosed /> : <Eye />}
									</Button>
								</InputRightElement>
							)}
						</InputGroup>

						<FormErrorMessage>
							{errors.newPassword && errors.newPassword.message}
						</FormErrorMessage>
					</FormControl>
				)}

				<FormControl isInvalid={!!errors.changePassword} mt="5" width="md">
					<Checkbox
						defaultChecked={defaultValues.changePassword}
						id="changePassword"
						{...register("changePassword")}
					>
						Desejo alterar minha senha
					</Checkbox>
				</FormControl>

				<Button
					colorScheme="primary"
					type="submit"
					title="Clique para atualizar os dados da sua conta"
					isLoading={isSubmitting}
					isDisabled={isSubmitting}
					mt="8"
				>
					Salvar alterações
				</Button>
			</Form>
		</Box>
	)
}
