// eslint-disable-next-line import/named
import { IconProps } from "phosphor-react"

import { UserRole } from "~/interfaces/UserRole"

type Permission = UserRole | "*"

export interface RouteItem {
	id: string // unique
	path: string // unique
	element: JSX.Element
	Icon: React.ForwardRefExoticComponent<
		IconProps & React.RefAttributes<SVGSVGElement>
	>
	label: string
	title?: string
	permissions: Permission[]
}
