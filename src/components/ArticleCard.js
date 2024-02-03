import React, { useContext } from 'react'
import languagesJson from '../languages/languages.json'
import ArticleSection from './ArticleSection'
import '../styles/article-card.css'
import icons from '../styles/icons'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function ArticleCard({ article }) {
	const { authData } = useContext(AuthContext)

	let introduction = [[]]
	for (const block of article.body.blocks) {
		if (block.type === 'header' && block.data.level === 2) break
		introduction.push(block)
	}

	function idFormatter(str) {
		const formattedId = str.toLowerCase().replaceAll(' ', '-')
		return formattedId
	}

	const textDirectionStyle = {
		direction:
			languagesJson.find((item) => item.code === article.language)?.rtl === 1
				? 'rtl'
				: 'ltr',
	}

	return (
		<div className='article-card-container'>
			<div className='article-card'>
				<Link
					to={`/${article.language}/${article.slug}`}
					className='article-card-link'
				>
					<h1 style={textDirectionStyle} className='article-title'>
						{article.title}
					</h1>
					<ArticleSection
						article={article}
						textDirectionStyle={textDirectionStyle}
						idFormatter={idFormatter}
						isFirst={true}
						section={introduction}
					/>
				</Link>
				<div className='card-buttons-container'>
					<Link
						to={authData ? `/${article.language}/${article.slug}/edit` : '/login'}
						className='card-button-link'
					>
						<span className='card-button with-text'>Edit{icons.edit}</span>
					</Link>
					<Link
						to={
							authData
								? `/${article.language}/${article.slug}/add-translation`
								: '/login'
						}
						className='card-button-link'
					>
						<span className='card-button with-text'>
							Add Translation{icons.translation}
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ArticleCard
