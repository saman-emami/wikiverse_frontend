import React, { useContext, useEffect, useReducer, useState } from 'react'
import ArticleEditor from './ArticleEditor'
import ArticleParser from './ArticleParser'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleSkeleton from './ArticleSkeleton'
import AuthContext from '../context/AuthContext'

function Article({ action }) {
	const [isLoading, setIsLoading] = useState(true)
	const [editorInstance, setEditorInstance] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [isWaiting, setIsWaiting] = useState(false)
	const { lang, slug } = useParams()
	const { authData } = useContext(AuthContext)
	const navigate = useNavigate()

	function reducer(state, { type, initialData, titleInput, bodyInput, languageInput }) {
		switch (type) {
			case 'initialize':
				return initialData

			case 'change-title':
				return { ...state, title: titleInput.replaceAll('&nbsp;', ' ') }

			case 'change-body':
				return { ...state, body: bodyInput }

			case 'change-language':
				return { ...state, language: languageInput }

			case 'new-translation':
				return {
					translation_parent: initialData.translation_parent,
					translations: initialData.translations,
					title: '',
					body: { blocks: [] },
					language: '',
				}

			default:
				return state
		}
	}

	const [article, articleDispatch] = useReducer(reducer, null)

	async function initializeArticle() {
		console.log(`https://wikiverse-backend.vercel.app/articles/${lang}/${slug}/`)
		if (action === 'create') {
			articleDispatch({
				type: 'initialize',
				initialData: { title: '', body: { blocks: [] }, language: '' },
			})
			document.title = 'Wikiverse | Write an article'
		} else {
			const response = await fetch(
				`https://wikiverse-backend.vercel.app/articles/${lang}/${slug}/`
			)
			if (response.status !== 200) navigate('/page-not-found')

			const data = await response.json()
			if (data.error === 404) navigate('/page-not-found')

			articleDispatch({
				type: action === 'addTranslation' ? 'new-translation' : 'initialize',
				initialData: data,
			})
			document.title = `${data.title}${
				action !== 'read'
					? action === 'edit'
						? ' | Edit Article'
						: ' | Add a new translation'
					: ''
			}`
		}
		setIsLoading(false)
	}

	function articleValidator() {
		if ([...article.title].every((char) => ' '.includes(char)))
			return 'Article title cannot be empty'
		if (JSON.stringify(article.body.blocks) === '[]')
			return 'Article body cannot be empty'

		if (article.language === '') return 'Select a language'

		return true
	}

	function stringToSlug(string) {
		const slug = string.toLowerCase().trim().replaceAll(' ', '-').replaceAll(',', '')
		return slug
	}

	async function postArticle() {
		if (articleValidator() !== true) {
			setErrorMessage(articleValidator())
			return
		}
		setIsWaiting(true)

		if (action === 'create') {
			const response = await fetch('https://wikiverse-backend.vercel.app/articles/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authData.access}`,
				},

				body: JSON.stringify(article),
			})
			const data = await response.json()

			if (data.error === 'article already exists') {
				setErrorMessage('Article with this title already exists for this language')
				return
			}

			if (response.status === 401) navigate('/login')
			if (response.status === 200) navigate(`/${data.language}/${data.slug}`)
		}
		if (action === 'edit') {
			const response = await fetch(
				`https://wikiverse-backend.vercel.app/articles/${lang}/${slug}/`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authData.access}`,
					},
					body: JSON.stringify({
						language: article.language,
						title: article.title,
						body: article.body,
					}),
				}
			)
			const data = await response.json()

			if (response.status === 401) navigate('/login')
			if (response.status === 200) navigate(`/${data.language}/${data.slug}`)
		}
		if (action === 'addTranslation') {
			const response = await fetch(`https://wikiverse-backend.vercel.app/articles/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authData.access}`,
				},
				body: JSON.stringify({
					translation_parent: article.translation_parent,
					language: article.language,
					title: article.title,
					body: article.body,
				}),
			})
			const data = await response.json()

			if (data.error === 'article already exists') {
				setErrorMessage('Article with this title already exists for this language')
				return
			}

			if (response.status === 401) navigate('/login')
			if (response.status === 200) navigate(`/${data.language}/${data.slug}`)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
		if (editorInstance !== null && JSON.stringify(editorInstance) !== '{}') {
			editorInstance.destroy()
		}
		initializeArticle()
		window.scrollTo(0, 0)
	}, [lang, slug, action])

	function handleTitleChange(event) {
		articleDispatch({ type: 'change-title', titleInput: event.target.value })
	}

	function handleBodyChange(content) {
		articleDispatch({ type: 'change-body', bodyInput: content })
	}

	function handleLanguageChange(e) {
		articleDispatch({ type: 'change-language', languageInput: e.target.value })
	}

	return isLoading === true ? (
		<ArticleSkeleton action={action} />
	) : action === 'read' ? (
		<ArticleParser setIsLoading={setIsLoading} article={article} />
	) : (
		<ArticleEditor
			errorMessage={errorMessage}
			handleLanguageChange={handleLanguageChange}
			postArticle={postArticle}
			handleTitleChange={handleTitleChange}
			editorInstance={editorInstance}
			setEditorInstance={setEditorInstance}
			action={action}
			article={article}
			handleBodyChange={handleBodyChange}
			isWaiting={isWaiting}
		/>
	)
}

export default Article
