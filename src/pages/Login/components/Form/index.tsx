import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react"
import { Eye, EyeClosed } from "phosphor-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { useUserStore } from "~/store"
import { ErrorCode, LoginFormValues as FormValues } from "~/interfaces"
import { createSession } from "~/services/requests"
import { LOGIN_BAD_REQUEST_ERRORS } from "~/utils"
import { LoginSchema } from "~/pages/Login/components/Form/schema"
import { LoginErrorAlert } from "~/pages/Login/components/ErrorAlert"
import { Form, InputLabel } from "~/components"

export const LoginForm = () => {
	const navigate = useNavigate()
	const { setUser } = useUserStore()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorAlertMessage, setErrorAlertMessage] = useState<string>("")
	const {
		handleSubmit,
		register,
		setError,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(LoginSchema),
	})
	const watchedPassword = watch("password")

	const onCloseErrorAlert = () => setErrorAlertMessage("")

	const handleLoginError = (error: ErrorCode | undefined) => {
		if (error) {
			const badRequestError = LOGIN_BAD_REQUEST_ERRORS.find(
				(item) => item.code === error
			)

			if (!badRequestError || badRequestError.field === "all") {
				setErrorAlertMessage(error)
			} else {
				setError(badRequestError.field, { type: "custom", message: error })
			}
		}
	}

	const onSubmit = async ({ email, password }: FormValues) => {
		setIsSubmitting(true)

		if (errorAlertMessage) onCloseErrorAlert()

		const { data, error } = await createSession({ email, password })

		setIsSubmitting(false)
		handleLoginError(error)

		if (data) {
			setUser({
				email: data.user.email,
				name: data.user.name,
				role: data.user.role,
				id: data.user.id,
			})
			navigate("/")
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<LoginErrorAlert
				isVisible={!!errorAlertMessage}
				message={errorAlertMessage}
				onClose={onCloseErrorAlert}
			/>

			<FormControl isRequired isInvalid={!!errors.email}>
				<InputLabel htmlFor="email">Email</InputLabel>

				<Input
					id="email"
					type="email"
					placeholder="Seu email"
					{...register("email")}
					disabled={isSubmitting}
					autoFocus
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors.password} mt={5}>
				<InputLabel htmlFor="password">Senha</InputLabel>

				<InputGroup>
					<Input
						type={isPasswordVisible ? "text" : "password"}
						id="password"
						placeholder="Sua senha"
						{...register("password")}
						disabled={isSubmitting}
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

			<Button
				colorScheme="primary"
				type="submit"
				title="Clique para fazer login e acessar sua conta"
				isLoading={isSubmitting}
				isDisabled={isSubmitting}
				mt={6}
			>
				Entrar
			</Button>
		</Form>
	)
}
