import React, { useCallback, useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
import languagesJson from '../languages/languages.json'
import icons from '../styles/icons'
import ContentEditable from 'react-contenteditable'
import { toBeRequired } from '@testing-library/jest-dom/matchers'

function TextEditor({
	action,
	article,
	handleBodyChange,
	editorInstance,
	setEditorInstance,
	handleTitleChange,
	postArticle,
	handleLanguageChange,
	errorMessage,
	isWaiting,
}) {
	const Header = require('@editorjs/header')
	const Quote = require('@editorjs/quote')
	const List = require('@editorjs/list')
	const SimpleImage = require('@editorjs/simple-image')
	const CodeTool = require('@editorjs/code')
	const InlineCode = require('@editorjs/inline-code')
	const Underline = require('@editorjs/underline')
	const Strikethrough = require('@sotaproject/strikethrough')

	const [isInitial, setIsInitial] = useState(true)
	const [textDirection, setTextDirection] = useState(getTextDirection)

	function getTextDirection() {
		const direction =
			languagesJson.find((item) => item.code === article.language)?.rtl === 1
				? 'rtl'
				: 'ltr'
		return direction
	}

	const initializeEditor = useCallback((wrapperRef) => {
		if (wrapperRef === null) return
		createEditorInstance()
		setIsInitial(false)
	}, [])

	const updateEditor = () => {
		if (editorInstance) {
			editorInstance.destroy()
		}
		createEditorInstance()
	}

	function createEditorInstance() {
		const editor = new EditorJS({
			tools: {
				header: {
					class: Header,
					config: {
						placeholder: 'Enter a header',
						levels: [2, 3],
						defaultLevel: 2,
					},
				},
				quote: {
					class: Quote,
					config: {
						quotePlaceholder: 'Enter a quote',
					},
				},
				list: {
					class: List,
					inlineToolbar: true,
					config: {
						defaultStyle: 'unordered',
					},
				},
				image: SimpleImage,
				code: CodeTool,
				inlineCode: {
					class: InlineCode,
					shortcut: 'CMD+SHIFT+M',
				},
				underline: Underline,
				strikethrough: Strikethrough,
			},
			holder: 'editorjs',
			data: article.body,
			onChange: async () => {
				let content = await editor.save()
				handleBodyChange(content)
			},
			i18n: {
				direction: textDirection,
			},
			autofocus: true,
			placeholder: 'Start typing here...',
		})
		setEditorInstance(editor)
	}

	useEffect(() => {
		setTextDirection(getTextDirection)
	}, [article.language])

	useEffect(() => {
		if (!isInitial) {
			updateEditor()
		}
	}, [textDirection, action])

	const textDirectionStyle = {
		direction:
			languagesJson.find((item) => item.code === article.language)?.rtl === 1
				? 'rtl'
				: 'ltr',
	}

	const languageAvailableOptions =
		action === 'addTranslation'
			? languagesJson.filter(
					(item) =>
						!article.translations
							.map((translation) => translation.language)
							.includes(item.code)
			  )
			: languagesJson

	const languageOptions =
		article !== null
			? languageAvailableOptions.map((item, index) => (
					<option key={index} value={item.code}>
						{item.name}
					</option>
			  ))
			: []

	const toolbarStyle =
		(action === 'create') | (action === 'addTranslation')
			? { justifyContent: 'space-between' }
			: undefined

	return (
		<div className='editor-container'>
			{errorMessage && (
				<div className='article-editor-error-message'>{errorMessage}</div>
			)}

			<h1 className='article-title-editor'>
				<ContentEditable
					style={textDirectionStyle}
					placeholder={'Enter a title'}
					onChange={handleTitleChange}
					html={article.title.replaceAll(' ', '&nbsp;')}
				/>
			</h1>
			<div className='editor-page-toolbar' style={toolbarStyle}>
				{action === 'edit' ? (
					<span onClick={postArticle} className='article-toolbar-button'>
						{icons.publish}
						Publish Changes{isWaiting && <div className='loader'></div>}
					</span>
				) : (
					<>
						<span className='article-toolbar-button'>
							{icons.language}
							<select
								className='select-language-dropdown'
								value={article.language}
								onChange={handleLanguageChange}
							>
								<option value='' disabled>
									Select a language
								</option>
								{languageOptions}
							</select>
						</span>
						<span onClick={postArticle} className='article-toolbar-button'>
							{icons.publish}
							Publish Article{isWaiting && <div className='loader'></div>}
						</span>
					</>
				)}
			</div>
			<div
				style={
					(article.language === 'fa') | (article.language === 'ar')
						? {
								fontFamily: 'Tahoma',
						  }
						: undefined
				}
				id='editorjs'
				ref={initializeEditor}
			></div>
		</div>
	)
}

export default TextEditor
