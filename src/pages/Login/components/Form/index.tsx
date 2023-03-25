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
import { LoginFormValues as FormValues } from "~/interfaces"
import { createSession } from "~/services/requests"
import { LoginSchema } from "~/pages/Login/components/Form/schema"
import { Form, InputLabel } from "~/components"

export const LoginForm = () => {
	const navigate = useNavigate()
	const { setUser } = useUserStore()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(LoginSchema),
	})
	const watchedPassword = watch("password")

	const onSubmit = async ({ email, password }: FormValues) => {
		setIsSubmitting(true)

		const { data } = await createSession({ email, password })

		setIsSubmitting(false)

		if (data) {
			setUser({ email: data.user.email, name: data?.user?.name, role: data.user.role, id: data.user.id })
			navigate("/")
		}

		/** TO DO: Handle error properly... */
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isRequired isInvalid={!!errors.email}>
				<InputLabel htmlFor="email">Email</InputLabel>

				<Input
					id="email"
					type="email"
					placeholder="Seu email"
					{...register("email")}
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
