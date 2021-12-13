import React, { Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Route, useNavigate, Outlet } from 'react-router-dom'
import Landing from './Landing'

const IS_LOGGED_IN = gql`
	{
		me {
			id
		}
	}
`

interface IProps {
	children?: React.ReactNode
}

//mock authentication
//need to fix actual auth
const useAuth = () => {
	const user = { loggedIn: false }
	return user && user.loggedIn
}

const IsAuthenticated = ({ children }: IProps) => {
	//const { loading, error, data } = useQuery(IS_LOGGED_IN)
	const isAuthenticated = useAuth()

	/*
	const navigate = useNavigate()

	!!data && console.log('users: ', data)

	if (!!loading) {
		return <p>Loading...</p>
	} else if (!!error) {
		return <p>{error.message}</p>
	}
	if (!data.me) {
		navigate('/landing')
	} */

	return isAuthenticated ? <Outlet /> : <Landing />
}

export default IsAuthenticated
