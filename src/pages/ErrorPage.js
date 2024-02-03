import React from "react"
import "../styles/error-page.css"
import { Link } from "react-router-dom"
import icons from "../styles/icons"

function ErrorPage({ error }) {
	let errorMessage
	if (error === "page-not-found") {
		errorMessage = {
			header1: "404",
			header2: "Error 404 - Page Not Found",
			body: "The page you requested could not be found",
		}
	}

	if (error === "fetch-error") {
		errorMessage = {
			header1: "Error",
			header2: "Page could not be loaded",
			body: "Something went wrong when loading this page",
		}
	}

	return (
		<div className="error-page-container">
			<h1 id="error-header-1">{errorMessage.header1}</h1>
			<h2 id="error-header-2">{errorMessage.header2}</h2>
			<p id="error-body">{errorMessage.body}</p>
			<Link to={"/"} id="go-home-button">
				<span>Take Me Home{icons.arrowForward}</span>
			</Link>
		</div>
	)
}

export default ErrorPage
