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

import { AccountFormValues as FormValues, ErrorCode } from "~/interfaces"
import { useUserStore } from "~/store"
import { updateAccount } from "~/services"
import { UPDATE_ACCOUNT_BAD_REQUEST_ERRORS } from "~/utils"
import { AccountSchema } from "~/pages/Settings/components/Form/schema"
import { DefaultAlert, Form, InputLabel } from "~/components"

type AlertData = { status: "success" | "error"; message: string } | null

export const SettingsForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [alertData, setAlertData] = useState<AlertData>(null)
	const { user, setUser } = useUserStore()
	const defaultValues: FormValues = {
		changePassword: false,
		name: user?.name || "",
		email: user?.email || "",
		phone: undefined,
		newPassword: undefined,
		password: "",
	}
	const {
		handleSubmit,
		setError,
		register,
		reset,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(AccountSchema),
		defaultValues,
	})
	const watchedPassword: string = watch("password")
	const watchedNewPassword: string | undefined = watch("newPassword")
	const watchedChangePassword: boolean = watch("changePassword")

	const onCloseAlert = () => setAlertData(null)

	const handleAccountErrors = (message: ErrorCode | undefined) => {
		if (message) {
			const badRequestError = UPDATE_ACCOUNT_BAD_REQUEST_ERRORS.find(
				(item) => item.code === message
			)

			if (!badRequestError) {
				setAlertData({ status: "error", message })
			} else {
				setError(badRequestError.field, { type: "custom", message })
			}
		}
	}

	const onSubmit = async ({ name, password, newPassword }: FormValues) => {
		setIsSubmitting(true)

		if (alertData) onCloseAlert()

		const payload = { name, password, newPassword }
		const { data, error } = await updateAccount(payload)

		handleAccountErrors(error)

		if (data) {
			const updatedName = data?.user?.name ?? ""

			setAlertData({
				status: "success",
				message: "Seus dados foram atualizados com sucesso!",
			})
			reset({
				...defaultValues,
				name: updatedName,
				password: defaultValues.password,
				newPassword: defaultValues.newPassword,
			})

			if (user) setUser({ ...user, name: updatedName })
		}

		setIsSubmitting(false)
	}

	return (
		<Box mt="12">
			<DefaultAlert
				mb="5"
				message={alertData?.message ?? ""}
				status={alertData?.status}
				isVisible={!!alertData}
				onClose={onCloseAlert}
			/>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormControl
					isInvalid={!!errors.email}
					width="md"
					title="Você ainda não pode editar o seu email"
				>
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
						disabled={isSubmitting}
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
							disabled={isSubmitting}
							{...register("password")}
						/>
						{!!watchedPassword && !isSubmitting && (
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
								disabled={isSubmitting}
								{...register("newPassword")}
							/>
							{!!watchedNewPassword && !isSubmitting && (
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
						disabled={isSubmitting}
						{...register("changePassword")}
					>
						Desejo alterar minha senha
					</Checkbox>
				</FormControl>

				<Button
					size="sm"
					mt="8"
					colorScheme="primary"
					type="submit"
					title="Clique para atualizar os dados da sua conta"
					isLoading={isSubmitting}
					isDisabled={isSubmitting}
				>
					Salvar alterações
				</Button>
			</Form>
		</Box>
	)
}
