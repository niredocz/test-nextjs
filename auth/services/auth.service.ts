import Cookies from "js-cookie"

export const COOKIE_KEY = "access_token"

export const AuthService = {
	getToken: () => Cookies.get(COOKIE_KEY),
	getRefreshToken: () => Cookies.get("refresh_token"),
	/**
	 * Sets the token and its expiration date in the browser cookie.
	 *
	 * @param {string} token - The token string to be stored in the cookie.
	 * @param {string} expiredAt - ISO 8601 format The expiration date of the token in seconds.
	 * @return {void} This function does not return a value.
	 */
	setToken: (token: string) => Cookies.set(COOKIE_KEY, token, {}),
	setRefreshToken: (token: string, expiredAt: string) => {
		Cookies.set("refresh_token", token, {
			expires: new Date(expiredAt),
		})
	},
	removeToken: () => Cookies.remove(COOKIE_KEY),
	removeRefreshToken: () => Cookies.remove("refresh_token"),
	isAuthenticated: () => !!AuthService.getToken(),
}
