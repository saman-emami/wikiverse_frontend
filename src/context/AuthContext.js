import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export function AuthProvider({ children, ...rest }) {
	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [authData, setAuthData] = useState(() =>
		localStorage.getItem('authData')
			? JSON.parse(localStorage.getItem('authData'))
			: null
	)

	async function updateToken() {
		const response = await fetch(
			'https://wikiverse-backend.vercel.app/token/refresh/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					refresh: authData.refresh,
				}),
			}
		)
		const data = await response.json()
		if (response.status === 200) {
			setAuthData(() => data)
			localStorage.setItem('authData', JSON.stringify(data))
		} else {
			logout()
		}
	}

	function logout() {
		setAuthData(() => null)
		localStorage.removeItem('authData')
	}

	useEffect(() => {
		if (isInitialLoad) {
			if (authData !== null) {
				updateToken()
			}
			setIsInitialLoad(false)
		}
		if (authData !== null) {
			const interval = setInterval(() => {
				updateToken()
			}, 4 * 60 * 1000)
			return () => clearInterval(interval)
		}
	}, [authData])

	const contextData = {
		setAuthData: setAuthData,
		authData: authData,
		logout: logout,
		username: authData ? jwt_decode(authData.access).username : null,
	}

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export default AuthContext
