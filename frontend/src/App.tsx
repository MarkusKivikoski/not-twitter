import React from 'react'
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	HttpLink,
} from '@apollo/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { setContext } from 'apollo-link-context'

import Users from './components/Users'
import Landing from './components/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
const authLink = setContext(async (req, { headers }) => {
	const token = localStorage.getItem('token')

	return {
		...headers,
		headers: {
			Authorization: token ? `Bearer ${token}` : null,
		},
	}
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
	link: link as any,
	cache: new InMemoryCache(),
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route path="/users" element={<Users />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/landing" element={<Landing />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
		</ApolloProvider>
	)
}

export default App
