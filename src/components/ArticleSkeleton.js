import React from "react"
import "../styles/article-skeleton.css"
import icons from "../styles/icons"

function ArticleSkeleton({ action }) {
	const skeletonGridStyle =
		action === "read"
			? { display: "grid", gridTemplateColumns: "1fr auto 1fr" }
			: undefined

	return (
		<div className="skeleton-page-container">
			<div style={skeletonGridStyle} className="skeleton-grid-layout">
				{action === "read" && (
					<div className="skeleton-sidebar">
						<div className="skeleton-sidebar-header"></div>
						<div className="skeleton-sidebar-text"></div>
						<div className="skeleton-sidebar-text"></div>
						<div className="skeleton-sidebar-text"></div>
						<div className="skeleton-sidebar-text"></div>
						<div className="skeleton-sidebar-text"></div>
					</div>
				)}

				<div className="skeletion-article-container">
					<div className="skeleton-article">
						<div className="skeleton-header-1"></div>
						<div className="skeleton-toolbar">
							<div className="skeleton-toolbar-button"></div>
							<div className="skeleton-toolbar-button"></div>
						</div>
						<div className="skeleton-paragraph">
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
						</div>
						<div className="skeleton-paragraph">
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
						</div>
						<div className="skeleton-header-2">
							{icons.expandLess}
							<div className="skeleton-header-2-text"></div>
						</div>
						<div className="skeleton-paragraph">
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
						</div>
						<div className="skeleton-header-2">
							{icons.expandLess}
							<div className="skeleton-header-2-text"></div>
						</div>
						<div className="skeleton-paragraph">
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
						</div>
						<div className="skeleton-header-2">
							{icons.expandLess}
							<div className="skeleton-header-2-text"></div>
						</div>
						<div className="skeleton-paragraph">
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
							<div className="skeleton-text"></div>
						</div>
					</div>
					<div style={{ visibility: "hidden" }}>
						--------------
						--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArticleSkeleton
