import { StateCreator, create } from "zustand"
import { IRootTypes, useRootStore } from "@/app/(client)/(root)/store/rootStore"
import {
	IProductTypes,
	useProductStore,
} from "@/app/(client)/products/store/productStore"

type TGlobalState = {
	pageParams: {
		id: string | undefined
	}
}

type TGlobalAction = {
	setPageParams?: (pageParams: { id: string | undefined }) => void
}

interface IGlobalTypes extends TGlobalState, TGlobalAction {}

const useGlobalStore: StateCreator<IGlobalTypes> = (set) => ({
	pageParams: {
		id: undefined,
	},

	// -------------- Setter Zustand -------------- //
	setPageParams: (pageParams: { id: string | undefined }) =>
		set({ pageParams }),
})

export const useStore = create<IProductTypes & IRootTypes & IGlobalTypes>(
	(...a) => ({
		...useRootStore(...a),
		...useProductStore(...a),
		...useGlobalStore(...a),
	})
)

export default useStore
