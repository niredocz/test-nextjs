import { StateCreator } from "zustand"

type TProductState = {
	isFiltered: boolean
}

type TProductAction = {
	setIsFiltered: (isFiltered: boolean) => void
}

export interface IProductTypes extends TProductState, TProductAction {}

export const useProductStore: StateCreator<IProductTypes> = (set) => ({
	isFiltered: false,

	// -------------- Setter Zustand -------------- //
	setIsFiltered: (isFiltered: boolean) => set({ isFiltered }),
})
