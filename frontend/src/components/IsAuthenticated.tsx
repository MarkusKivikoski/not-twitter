import React, { Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const IS_LOGGED_IN = gql`
	{
		me {
			id
		}
	}
`

interface IUser {
	name: string
}

interface IProps {
	children?: React.ReactNode
}

const IsAuthenticated = ({ children }: IProps) => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN)
	const navigate = useNavigate()

	!!data && console.log('users: ', data)

	if (!!loading) {
		return <p>Loading...</p>
	} else if (!!error) {
		return <p>{error.message}</p>
	}
	if (!data.me) {
		navigate('/landing')
	}

	return <Fragment>{children}</Fragment>
}

export default IsAuthenticated
