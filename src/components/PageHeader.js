import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import icons from '../styles/icons'

function PageHeader() {
	const { authData, username, logout } = useContext(AuthContext)

	return (
		<header className='page-header'>
			<Link to='/' className='header-title-container'>
				<h1 id='header-title'>Wikiverse</h1>
			</Link>
			{authData === null ? (
				<>
					<Link to='/login' className='header-button-container'>
						<span className='header-button'>Login</span>
					</Link>
					<Link to='/register' className='header-button-container'>
						<span className='header-button'>Sign Up</span>
					</Link>
				</>
			) : (
				<>
					<span id='logout-button' onClick={logout}>
						{icons.logout}
					</span>
					<p id='header-hello-message'>Hello {username}</p>
				</>
			)}
		</header>
	)
}

export default PageHeader
