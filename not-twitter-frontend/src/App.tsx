import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import Users from './components/Users'

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache(),
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Users />
		</ApolloProvider>
	)
}

export default App
