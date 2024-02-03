import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/home-page.css'
import languagesJson from '../languages/languages.json'
import { Link, useNavigate } from 'react-router-dom'
import HomeCardPageSection from '../components/HomeCardPageSection'
import icons from '../styles/icons'
import AuthContext from '../context/AuthContext'

function HomePage() {
	const [homePageData, setHomePageData] = useState(null)
	const [searchData, setSearchData] = useState(null)
	const [searchInput, setSearchInput] = useState('')
	const [debouncedSearchInput, setDebouncedSearchInput] = useState('')
	const searcBarRef = useRef(null)
	const navigate = useNavigate()

	const { authData } = useContext(AuthContext)

	const userLanguage = languagesJson.find(
		(language) => language.code === window.navigator.language.slice(0, 2)
	)

	async function fetchHomePageData() {
		const response = await fetch(
			`https://wikiverse-backend.vercel.app/homepage/${window.navigator.language.slice(
				0,
				2
			)}`
		)
		if (response.status !== 200) navigate('/loading-error')

		const data = await response.json()
		setHomePageData(data)
	}

	useEffect(() => {
		document.title = 'Wikiverse'
		fetchHomePageData()
	}, [])

	useEffect(() => {
		const debounceTimeOut = setTimeout(() => {
			setDebouncedSearchInput(searchInput)
		}, 600)

		return () => {
			clearTimeout(debounceTimeOut)
		}
	}, [searchInput])

	useEffect(() => {
		const abortController = new AbortController()
		setSearchData(null)

		async function fetchSearchData() {
			try {
				const response = await fetch(
					`https://wikiverse-backend.vercel.app/search/${searchInput}`,
					{ signal: abortController.signal }
				)
				if (response.status !== 200) navigate('/loading-error')

				const data = await response.json()
				setSearchData(data)
			} catch (error) {
				if (error.name === 'AbortError') {
				}
			}
		}

		if (![...searchInput].every((char) => ' '.includes(char))) fetchSearchData()

		return () => abortController.abort()
	}, [debouncedSearchInput])

	const loadingAnimation = (
		<div className='home-page-loading-container'>
			<div className='loader'></div>
		</div>
	)

	return (
		<div className='home-page-container'>
			<div className='search-bar-section-container'>
				<div className='search-bar-section'>
					<input
						ref={searcBarRef}
						id='search-bar'
						type='text'
						value={searchInput}
						onChange={(event) => setSearchInput(event.target.value)}
						placeholder='Search'
					/>
					<span id='search-icon' onClick={() => searcBarRef.current.focus()}>
						{icons.search}
					</span>
				</div>
			</div>

			{homePageData === null ? (
				loadingAnimation
			) : (
				<div className='home-page-sections-container'>
					{![...searchInput].every((char) => ' '.includes(char)) ? (
						searchData ? (
							searchData.length !== 0 ? (
								<div className='home-page-search-section'>
									<HomeCardPageSection
										title='Search Results'
										cards={searchData}
									/>
								</div>
							) : (
								<div className='no-search-results-message-container'>
									<div className='no-search-results-message'>
										<h2>No results were found</h2>
									</div>
								</div>
							)
						) : (
							loadingAnimation
						)
					) : (
						<>
							<div className='create-article-section-container'>
								<div className='create-article-section'>
									<h2>Contribute to Wikiverse</h2>
									<Link
										to={authData ? `/new-article` : '/login'}
										className='new-article-button-container'
									>
										<span className='new-article-button'>
											Write an article{icons.article}
										</span>
									</Link>
								</div>
							</div>
							{homePageData.userLanguageArticles.length !== 0 && (
								<HomeCardPageSection
									title={`New ${userLanguage.name} Articles`}
									cards={homePageData.userLanguageArticles}
								/>
							)}

							<HomeCardPageSection
								title='Recently Added'
								cards={homePageData.recentlyAdded}
							/>
							<HomeCardPageSection
								title='Recently Edited'
								cards={homePageData.recentlyEdited}
							/>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default HomePage
