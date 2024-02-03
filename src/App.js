import AuthContext, { AuthProvider } from "./context/AuthContext"
import { Routes, Route, Link } from "react-router-dom"
import "./styles/article.css"
import "./styles/page-header.css"
import Article from "./components/Article"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import PageHeader from "./components/PageHeader"
import PrivateRoute from "./utils/PrivateRoute"

function App() {
	return (
		<AuthProvider>
			<PageHeader />

			<Routes>
				<Route path="/" exact element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/:lang/:slug" element={<Article action="read" />} />
				<Route
					path="/:lang/:slug/edit"
					element={
						<PrivateRoute>
							<Article action="edit" />
						</PrivateRoute>
					}
				/>
				<Route
					path="/:lang/:slug/add-translation"
					element={
						<PrivateRoute>
							<Article action="addTranslation" />
						</PrivateRoute>
					}
				/>
				<Route
					path="/new-article"
					element={
						<PrivateRoute>
							<Article action="create" />
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<ErrorPage error="page-not-found" />} />
				<Route
					path="/loading-error"
					element={<ErrorPage error="fetch-error" />}
				/>
			</Routes>
		</AuthProvider>
	)
}

export default App
