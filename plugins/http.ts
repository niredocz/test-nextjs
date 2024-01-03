'use client'

import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import {
	useQuery,
	UseQueryOptions,
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query"
import { AuthService } from "@/auth/services/auth.service"
import { Env } from "@/config/env"
import { jwtDecode } from "jwt-decode"
import { useEffect, useMemo } from "react"

export type DefaultResponseError = {
	code: number
	message: string
	errors: Array<string>
}

export const api = axios.create({
	baseURL: Env.API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

// api.defaults.withCredentials = true
api.interceptors.request.use(async (config) => {
	const accessToken = AuthService.getToken()

	if (!accessToken) return config
	const { exp } = jwtDecode(accessToken)

	if (!exp) return config

	if (Date.now() > exp * 1000) {
		const accessToken = await onRefreshToken()

		config.headers.Authorization = `Bearer ${accessToken}`

		return config
	}

	if (accessToken) {
		config.headers.Authorization = `Bearer ${AuthService.getToken()}`
	}
	return config
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const err = error
		const prevRequest = err?.config
		if (err?.response?.status === 403 && !prevRequest?.sent) {
			if (prevRequest?.headers) return

	    prevRequest.sent = true
			const newAccessToken = await onRefreshToken()
			prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
			return axios(prevRequest)
		}
	}
)

const onRefreshToken = async () => {
	try {
		const { data } = await api.post(
			"/public/refresh-token",
			{},
			{
				baseURL: Env.API_BASE_URL,
				headers: {
					Authorization: `Bearer ${AuthService.getRefreshToken()}`,
				},
			}
		)
		AuthService.setToken(data.data.access_token)

		return data.data.access_token
	} catch (error) {
		console.error(error)
		window.location.href = "/auth/logout"
	}
}

type UseHttpOptions<TData = any, TError = any> = {
	axiosOptions?: AxiosRequestConfig
	queryOptions?: Omit<UseQueryOptions<TData, TError>, "queryKey"> & {
		queryKey?: any[]
	}
}

type UseHttpMutationOptions<TData = any, TError = any, TVariables = any> = {
	axiosOptions?: AxiosRequestConfig<TData>
	mutationOptions?: UseMutationOptions<TData, TError, TVariables>
}

export function useHttp<TData = any, TError = unknown>(
	url: string,
	options?: UseHttpOptions<TData, AxiosError<TError>>
) {
	const queryKey = useMemo(() => {
		return [
			"http",
			url,
			options?.axiosOptions?.params,
			options?.queryOptions?.queryKey,
		]
	}, [url, options])

	const queryOptions = {
		queryKey: queryKey,
		queryFn: async () => {
			try {
				const { data } = await api.request<TData>({
					url,
					...options?.axiosOptions,
				})
				return data
			} catch (error: any) {
				const err = error as AxiosError
				console.log(err.response)
				throw err.response
			}
		},
	}

	if (options?.queryOptions) {
		Object.assign(queryOptions, options.queryOptions)
	}

	const query = useQuery<TData, AxiosError<TError>>(queryOptions)
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!query.isError) return
	}, [query.isError, query.error, queryClient])

	return query
}

export function useHttpMutation<
	TData = any,
	TError = DefaultResponseError,
	TVariables = any
>(url: string, options?: UseHttpMutationOptions<TData, TError, TVariables>) {
	const defaultOptions = {
		mutationKey: ["http", url],
		mutationFn: async (vars: TVariables): Promise<TData> => {
			try {
				const { data } = await api.request({
					url,
					data: vars,
					...options?.axiosOptions,
				})

				return data
			} catch (error: any) {
				console.log(error?.response)
				throw error.response?.data || error.response
			}
		},
	}

	if (options?.mutationOptions) {
		Object.assign(defaultOptions, options.mutationOptions)
	}

	return useMutation<TData, TError, TVariables>(defaultOptions)
}
