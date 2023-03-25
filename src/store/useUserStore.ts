import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { User as UserData } from "~/interfaces"

type User = Omit<UserData, "password"> | null

interface UserState {
	user: User
	setUser: (user: User) => void
}

export const useUserStore = create<UserState>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				setUser: (user: User) => set(() => ({ user })),
			}),
			{
				name: "user-storage",
			}
		)
	)
)
