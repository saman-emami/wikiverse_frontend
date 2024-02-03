import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/login-register-page.css'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
	const { setAuthData, authData } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (authData !== null) navigate('/')
	}, [])

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})

	const [errorMessage, setErrorMessage] = useState(null)
	const [isWaiting, setIsWaiting] = useState(false)

	function handleLoginFormChange(e) {
		setLoginForm((prev) => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	function validateForm(form) {
		if (!form.username) return 'Username is required'

		if (!form.password) return 'Password is required'

		return true
	}

	useEffect(() => {
		document.title = 'Wikiverse | Login'
	}, [])

	async function login() {
		if (validateForm(loginForm) !== true) {
			setErrorMessage(validateForm(loginForm))
			return
		}
		setIsWaiting(true)

		const response = await fetch('https://wikiverse-backend.vercel.app/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: loginForm.username,
				password: loginForm.password,
			}),
		})

		setIsWaiting(false)

		const data = await response.json()

		if (response.status === 401) {
			setErrorMessage('No active account found with the given credentials.')
			return
		}

		if (response.status !== 200) return

		setAuthData(() => data)
		localStorage.setItem('authData', JSON.stringify(data))
		navigate('/')
	}

	return (
		<div className='form-box-container'>
			<div className='form-box'>
				<h1 className='form-title'>Login</h1>
				<div className='field-container'>
					<input
						className='form-field'
						type='text'
						name='username'
						value={loginForm.username}
						placeholder='Username'
						onChange={handleLoginFormChange}
					/>
				</div>

				<div className='field-container'>
					<input
						className='form-field'
						type='password'
						name='password'
						value={loginForm.password}
						placeholder='Password'
						onChange={handleLoginFormChange}
					/>
				</div>

				{errorMessage && <p className='Form-error-message'>{errorMessage}</p>}

				<button className='submit-button' onClick={login}>
					Login
					{isWaiting && <div className='loader'></div>}
				</button>

				<p className='form-bottom-message'>
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
