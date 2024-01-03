import { StateCreator } from "zustand"

type TRootState = {
	openModalLoginClient: boolean
}

type TRootAction = {
	setOpenModalLoginClient: (openModalLoginClient: boolean) => void
}

export interface IRootTypes extends TRootState, TRootAction {}


export const useRootStore: StateCreator<IRootTypes> = (set) => ({
	openModalLoginClient: false,

	// -------------- Setter Zustand -------------- //
	setOpenModalLoginClient: (openModalLoginClient: boolean) =>
		set({ openModalLoginClient }),
})
