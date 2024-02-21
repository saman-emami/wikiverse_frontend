# Wikiverse - A Collaborative Wiki Platform
## Overview
Wikiverse is a collaborative wiki website built with React.js, offering a seamless WYSIWYG editing experience powered by Editor.js. It leverages JWT technology for secure user authentication, ensuring anyone can contribute and enrich the knowledge base. With native language support for all languages, Wikiverse fosters global participation and information sharing.
![Wikiverse - A Collaborative Wiki Platform](https://github.com/saman-emami/wikiverse_frontend/assets/157804251/5070de2c-80c0-4d85-b011-cd92d885f5cb)
![The WYSIWYG editor](https://github.com/saman-emami/wikiverse_frontend/assets/157804251/bc9acdf6-add2-45d5-b262-7809333868f8)
## Live Demo
Experience Wikiverse in action at:
https://wiki-verse.netlify.app/
## Features
* __Real-time Collaboration__: Users can simultaneously edit articles, seeing changes reflected instantly.
* __Multilingual Support__: Create and view content in any language, fostering global accessibility.
* __WYSIWYG Editing__: Editor.js provides a user-friendly interface for rich text formatting.
* __User-Generated Content__: Anyone can create and edit articles, promoting knowledge sharing.
* __REST API__: React interacts with the Django backend through a well-defined REST API.
* __Robust Authentication__: Secure JWT-based authentication for user accounts.
## Technologies
* __Frontend__: Javascript, HTML5, CSS3, React.js, Editor.js
* __Backend__: Python, Django, Django REST Framework

## Backend Integration:
While the code for Wikiverse is divided into separate frontend and backend repositories, they work seamlessly together to provide a unified user experience. This separation of concerns promotes maintainability and scalability.

* __Frontend__: This repository focuses on crafting the user interface and interactive elements using React .
* __Backend__: The backend, managed in a separate repository (https://github.com/saman-emami/wikiverse_backend), primarily handles data management, authentication, and server-side logic using Django and Django REST Framework.

To establish communication between the two parts, the frontend leverages a well-defined REST API exposed by the backend. This API facilitates data exchange and ensures smooth interaction between the user interface and the underlying data layers.

## Contribution
While Wikiverse is primarily a personal project, I welcome any contributions and feedback. Feel free to fork the repository, suggest improvements, or report any issues you encounter. Feel free to reach out to me via email at: samanemami13@gmail.com
