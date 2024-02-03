import ArticleSection from "./ArticleSection"
import { useLocation, Link } from "react-router-dom"
import icons from "../styles/icons"
import TranslationsDropdown from "./TranslationsDropdown"
import languagesJson from "../languages/languages.json"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

function ArticleParser({ article, setIsLoading }) {
	const { authData } = useContext(AuthContext)
	const location = useLocation()
	let sections = [[]]

	for (const block of article.body.blocks) {
		if (block.type === "header" && block.data.level === 2) break
		sections[0].push(block)
	}

	const header2Indices = article.body.blocks
		.filter((block) => block.type === "header" && block.data.level === 2)
		.map((block) => article.body.blocks.indexOf(block))

	for (const header2Index of header2Indices) {
		sections.push(
			article.body.blocks.slice(
				header2Index,
				header2Indices[header2Indices.indexOf(header2Index) + 1]
			)
		)
	}

	function idFormatter(str) {
		const formattedId = str.toLowerCase().replaceAll(" ", "-")
		return formattedId
	}

	function setInnerHTML(node, content) {
		if (node) {
			node.innerHTML = content
		}
	}

	const textDirectionStyle = {
		direction:
			languagesJson.find((item) => item.code === article.language)?.rtl === 1
				? "rtl"
				: "ltr",
	}

	const sidebarPlacement = {
		order:
			languagesJson.find((item) => item.code === article.language)?.rtl === 1
				? 1
				: 0,
	}

	sections = sections.map((section, index) => (
		<ArticleSection
			textDirectionStyle={textDirectionStyle}
			idFormatter={idFormatter}
			isFirst={index === 0 ? true : false}
			key={index}
			section={section}
			article={article}
		/>
	))

	const contentsList = article.body.blocks
		.filter((block) => block.type === "header")
		.map((item, index) => (
			<li
				key={index}
				className={`sidebar-navigation-list-item ${
					item.data.level === 3 ? "navigation-sub-header" : ""
				}`}
			>
				<a
					className={
						"#" + idFormatter(item.data.text) === location.hash
							? "current"
							: undefined
					}
					href={"#" + idFormatter(item.data.text)}
					ref={(ref) => setInnerHTML(ref, item.data.text)}
				></a>
			</li>
		))

	return (
		<>
			<main className="article-container">
				<div className="main-element">
					<aside style={sidebarPlacement} className="sidebar-navigation">
						<h2 className="sidebar-navigation-header">Contents</h2>
						<ul style={textDirectionStyle} className="sidebar-navigation-list">
							<li className="sidebar-navigation-list-item">
								<a href="#">(Top)</a>
							</li>
							{contentsList}
						</ul>
					</aside>
					<article className="article-element">
						<header className="article-header-container">
							<h1 style={textDirectionStyle} className="article-title">
								{article.title}
							</h1>
							<div className="article-toolbar">
								<Link
									to={authData ? `edit` : "/login"}
									onClick={() => {
										setIsLoading(true)
									}}
								>
									<span className="article-toolbar-button">
										{icons.edit}
										Edit
									</span>
								</Link>
								<TranslationsDropdown
									setIsLoading={setIsLoading}
									translations={article.translations}
								/>
							</div>
						</header>
						{sections}
						<p style={{ visibility: "hidden" }}>
							----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
						</p>
					</article>
				</div>
			</main>
		</>
	)
}

export default ArticleParser
