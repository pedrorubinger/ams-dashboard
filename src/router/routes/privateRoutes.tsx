import {
	Buildings,
	Gear,
	House,
	Money,
	SignOut,
	UsersThree,
	Users as UsersIcon,
} from "phosphor-react"
import { PartnerProvider } from "~/contexts"

import { RouteItem } from "~/interfaces"
import {
	Home,
	PartnerDonations,
	Partners,
	Settings,
	Tenants,
	Users,
} from "~/pages"

export const privateRoutes: RouteItem[] = [
	{
		Icon: House,
		id: "home",
		path: "/",
		label: "Home",
		title: "Clique para ir para a página principal",
		permissions: ["*"],
		element: <Home />,
	},
	{
		Icon: Gear,
		id: "settings",
		path: "/configuracoes",
		label: "Configurações",
		title: "Clique para ir para a página de configurações",
		permissions: ["*"],
		element: <Settings />,
	},
	// {
	// 	Icon: null,
	// 	id: "volunteers",
	// 	path: "/voluntarios",
	// 	label: "Voluntários",
	// 	title: "Clique para gerenciar os voluntários",
	// 	permissions: ["admin"],
	// 	element: <></>,
	// },
	{
		Icon: Buildings,
		id: "tenants",
		path: "/instituicoes",
		label: "Instituições",
		title: "Clique para gerenciar as instituições",
		permissions: ["master"],
		element: <Tenants />,
	},
	{
		Icon: UsersIcon,
		id: "users",
		path: "/usuarios",
		label: "Usuários",
		title: "Clique para gerenciar os usuários",
		permissions: ["master"],
		element: <Users />,
	},
	{
		Icon: Money,
		id: "partnerDonations",
		path: "/contribuicoes",
		label: "Contribuições",
		title: "Clique para gerenciar as contribuições",
		permissions: ["admin"],
		element: <PartnerDonations />,
	},
	{
		Icon: UsersThree,
		id: "partners",
		path: "/associados",
		label: "Associados",
		title: "Clique para gerenciar os associados",
		permissions: ["admin"],
		element: (
			<PartnerProvider>
				<Partners />
			</PartnerProvider>
		),
	},
]

export const sideMenuItems: RouteItem[] = [
	...privateRoutes,
	{
		Icon: SignOut,
		id: "logout",
		label: "Sair",
		title: "Clique para encerrar a sessão atual e sair",
		path: "/logout",
		permissions: ["*"],
		element: <></>,
	},
]
