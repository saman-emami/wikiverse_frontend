import React, { useContext, useEffect, useRef, useState } from "react"
import languagesJson from "../languages/languages.json"
import icons from "../styles/icons"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

function TranslationsDropdown({ translations, setIsLoading }) {
	const { authData } = useContext(AuthContext)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)
	const dropdownButtonRef = useRef(null)

	const translationsList = translations.map((item, index) => (
		<Link key={index} to={`/${item.language}/${item.slug}`}>
			{languagesJson.find((language) => language.code === item.language).name}
		</Link>
	))

	const translationsCount = translationsList.length

	function openDropdown() {
		setIsDropdownOpen((prev) => !prev)
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownButtonRef.current &&
				!dropdownButtonRef.current.contains(event.target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsDropdownOpen(false)
			}
		}

		document.addEventListener("click", handleClickOutside)

		return () => {
			document.removeEventListener("click", handleClickOutside)
		}
	}, [dropdownRef])

	return (
		<>
			<span
				onClick={openDropdown}
				ref={dropdownButtonRef}
				className="article-toolbar-button"
			>
				{icons.translation}
				{translationsCount} Translations
			</span>
			{isDropdownOpen && (
				<div className="dropdown-container">
					<div ref={dropdownRef} className="dropdown">
						<h3>Available translations:</h3>
						<div className="languages-list">{translationsList}</div>
						<Link
							onClick={() => {
								setIsLoading(true)
							}}
							to={authData ? `add-translation` : "/login"}
							id="new-translation-button"
						>
							<span>
								{icons.add}
								Add translation
							</span>
						</Link>
					</div>
				</div>
			)}
		</>
	)
}

export default TranslationsDropdown
