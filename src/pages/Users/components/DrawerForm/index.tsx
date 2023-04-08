import React, { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
	Select,
} from "@chakra-ui/react"
import { Eye, EyeClosed } from "phosphor-react"

import { Tenant, UserFormValues, UsersDrawerProps } from "~/interfaces"
import { Form, InputLabel } from "~/components"

interface Props extends Pick<UsersDrawerProps, "mode" | "user"> {
	isSubmitting: boolean
	tenants: Tenant[]
	onSubmit: (values: UserFormValues) => Promise<void>
}

export const DrawerForm: React.FC<Props> = ({
	mode,
	tenants,
	isSubmitting,
	user,
	onSubmit,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const isCreating = mode === "create"
	const isEditing = mode === "update"
	const {
		handleSubmit,
		register,
		reset,
		watch,
		formState: { errors, isDirty },
	} = useFormContext<UserFormValues>()
	const watchedPassword = watch("password")

	useEffect(() => {
		if (user && !isCreating) {
			reset({
				name: user.name,
				email: user.email,
				tenantId: user.tenantId,
				isActive: user.isActive,
				password: "",
			})
		}
	}, [user, isCreating])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl mt={5} isInvalid={!!errors.tenantId} isRequired>
				<InputLabel htmlFor="tenantId">Instituição</InputLabel>

				<Select
					id="email"
					variant="outline"
					placeholder="Selecione uma instituição"
					{...register("tenantId")}
				>
					{tenants.map((tenant) => (
						<option key={tenant.id} value={tenant.id}>
							{tenant.name}
						</option>
					))}
				</Select>

				<FormErrorMessage>
					{errors.tenantId && errors.tenantId.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={!!errors.email}
				mt={5}
				isDisabled={isEditing}
			>
				<InputLabel htmlFor="email">Email do usuário</InputLabel>

				<Input
					id="email"
					type="email"
					title={
						isEditing ? "Você ainda não pode alterar o email do usuário" : ""
					}
					placeholder="Email do usuário"
					{...register("email")}
					isDisabled={isSubmitting || isEditing}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isRequired isInvalid={!!errors.name} mt={5}>
				<InputLabel htmlFor="name">Nome do usuário</InputLabel>

				<Input
					id="name"
					type="text"
					placeholder="Nome do usuário"
					{...register("name")}
					isDisabled={isSubmitting}
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			{!!isCreating && (
				<>
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
				</>
			)}

			<FormControl isInvalid={!!errors.isActive} mt="5" width="md">
				<Checkbox
					disabled={isSubmitting}
					defaultChecked={isCreating ? true : user?.isActive || false}
					id="isActive"
					{...register("isActive")}
				>
					Está ativo
				</Checkbox>
			</FormControl>

			<Button
				colorScheme="primary"
				type="submit"
				title={isCreating ? "Cadastrar usuário" : "Atualizar dados do usuário"}
				isLoading={isSubmitting}
				isDisabled={isSubmitting || (!isCreating && !isDirty)}
				mt={6}
			>
				{isCreating ? "Cadastrar" : "Salvar alterações"}
			</Button>
		</Form>
	)
}
