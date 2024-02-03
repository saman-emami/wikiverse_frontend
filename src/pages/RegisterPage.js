import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
	const { setAuthData, authData } = useContext(AuthContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (authData !== null) navigate('/')
	}, [])

	const [registerForm, setRegisterForm] = useState({
		username: '',
		password1: '',
		password2: '',
	})

	const [errorMessage, setErrorMessage] = useState(null)
	const [isWaiting, setIsWaiting] = useState(false)

	function handleRegisterFormChange(e) {
		setRegisterForm((prev) => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	function validateForm(form) {
		if (!form.username) return 'Username is required'

		if (!form.password1) return 'Password is required'

		if (!form.password2) return 'Password confirmation is required'

		if (registerForm.password1 !== registerForm.password2)
			return "The two password fields didn't match"

		if (form.password1.length < 8)
			return 'This password is too short. It must contain at least 8 characters.'

		if ([...form.password1].every((char) => '0123456789'.includes(char)))
			return 'This password is entirely numeric.'

		return true
	}

	useEffect(() => {
		document.title = 'Wikiverse | Register'
	}, [])

	async function register() {
		if (validateForm(registerForm) !== true) {
			setErrorMessage(validateForm(registerForm))
			return
		}

		setIsWaiting(true)

		const response = await fetch('https://wikiverse-backend.vercel.app/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: registerForm.username,
				password: registerForm.password1,
			}),
		})

		setIsWaiting(false)

		if (response.status !== 200) return
		const data = await response.json()

		if (data.error === 'user already exists') {
			setErrorMessage('A user with that username already exists.')
			return
		}

		setAuthData(() => data)
		localStorage.setItem('authData', JSON.stringify(data))
		navigate('/')
	}

	return (
		<>
			<div className='form-box-container'>
				<div className='form-box'>
					<h1 className='form-title'>Sign Up</h1>
					<div className='field-container'>
						<input
							className='form-field'
							type='text'
							name='username'
							placeholder='Enter a username'
							value={registerForm.username}
							onChange={handleRegisterFormChange}
						/>
					</div>
					<div className='field-container'>
						<input
							className='form-field'
							type='password'
							name='password1'
							placeholder='Enter a password'
							value={registerForm.password1}
							onChange={handleRegisterFormChange}
						/>
					</div>
					<div className='field-container'>
						<input
							className='form-field'
							type='password'
							name='password2'
							placeholder='Confirm your password'
							value={registerForm.password2}
							onChange={handleRegisterFormChange}
						/>
					</div>
					{errorMessage && <p className='Form-error-message'>{errorMessage}</p>}

					<button className='submit-button' onClick={register}>
						Register
						{isWaiting && <div className='loader'></div>}
					</button>

					<p className='form-bottom-message'>
						Already have an account? <Link to='/login'>Login</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default RegisterPage
