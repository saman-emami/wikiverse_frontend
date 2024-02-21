import React, { useState } from "react"
import icons from "../styles/icons"

function ArticleSection({ section, isFirst, idFormatter, textDirectionStyle, article }) {
	const initialIsOpenState = isFirst ? true : window.innerWidth > 650 ? true : false

	const [isOpen, setIsOpen] = useState(initialIsOpenState)

	function setInnerHTML(node, content) {
		if (node) {
			node.innerHTML = content
		}
	}

	const sectionContentContainerStyle = {
		display: isOpen ? "block" : "none",
	}

	function sectionParser(section) {
		let content = []
		for (const block of section) {
			switch (block.type) {
				case "header":
					if (block.data.level === 1) {
						content.push(
							<h1
								style={textDirectionStyle}
								id={idFormatter(block.data.text)}
								key={block.id}
								ref={(ref) => setInnerHTML(ref, block.data.text)}></h1>
						)
					} else if (block.data.level === 2) {
						content.push(
							<h2
								style={textDirectionStyle}
								className="section-title"
								id={idFormatter(block.data.text)}
								key={block.id}
								ref={(ref) => setInnerHTML(ref, block.data.text)}></h2>
						)
					} else {
						content.push(
							<h3
								className="article-subheader"
								style={textDirectionStyle}
								id={idFormatter(block.data.text)}
								key={block.id}
								ref={(ref) => setInnerHTML(ref, block.data.text)}></h3>
						)
					}

					break
				case "paragraph":
					content.push(
						<p
							style={textDirectionStyle}
							className="article-paragraph"
							key={block.id}
							ref={(ref) => setInnerHTML(ref, block.data.text)}></p>
					)
					break
				case "quote":
					content.push(
						<blockquote
							style={textDirectionStyle}
							className="article-quote"
							key={block.id}>
							<q ref={(ref) => setInnerHTML(ref, block.data.text)}></q>
							{block.data.caption && (
								<p
									ref={(ref) => setInnerHTML(ref, block.data.caption)}
									style={textDirectionStyle}
									className="article-quote-author"></p>
							)}
						</blockquote>
					)
					break
				case "list":
					if (block.data.style === "ordered") {
						content.push(
							<ol style={textDirectionStyle} key={block.id}>
								{block.data.items.map((item, index) => (
									<li
										className="article-ordered-list-item"
										key={index}
										ref={(ref) => setInnerHTML(ref, item)}></li>
								))}
							</ol>
						)
					} else {
						content.push(
							<ul style={textDirectionStyle} key={block.id}>
								{block.data.items.map((item, index) => (
									<li
										className="article-unordered-list-item"
										key={index}
										ref={(ref) => setInnerHTML(ref, item)}></li>
								))}
							</ul>
						)
					}
					break
				case "image":
					content.push(
						<figure className="article-image-figure" key={block.id}>
							<img
								className="article-image"
								src={block.data.url}
								alt={block.data.caption}
							/>
							<figcaption style={textDirectionStyle}>{block.data.caption}</figcaption>
						</figure>
					)
					break
				case "code":
					content.push(
						<div key={block.id}>
							<pre className="article-code-block">{block.data.code}</pre>
						</div>
					)
					break
			}
		}
		return content
	}

	function toggleSectionOpen() {
		setIsOpen((prev) => !prev)
	}

	return (
		<section
			className="article-section"
			style={
				(article.language === "fa") | (article.language === "ar")
					? {
							fontFamily: "Tahoma",
					  }
					: undefined
			}>
			{isFirst ? (
				sectionParser(section)
			) : (
				<>
					<div
						style={textDirectionStyle}
						onClick={toggleSectionOpen}
						className="sections-title-container">
						{isOpen ? icons.expandLess : icons.expandMore}
						{sectionParser(section)[0]}
					</div>
					<div className="section-content-container" style={sectionContentContainerStyle}>
						{sectionParser(section).slice(1)}
					</div>
				</>
			)}
		</section>
	)
}

export default ArticleSection
