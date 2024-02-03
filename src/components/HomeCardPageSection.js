import React from "react"
import ArticleCard from "./ArticleCard"

function HomeCardPageSection({ title, cards }) {
	const articleCards = cards.map((card, index) => (
		<ArticleCard key={index} article={card} />
	))

	return (
		<div className="home-page-section">
			<h2 className="home-page-section-title">{title}</h2>
			<div className="article-cards-section">{articleCards}</div>
		</div>
	)
}

export default HomeCardPageSection
