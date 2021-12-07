import React from 'react'
import { gql, useQuery } from '@apollo/client'

const USERS_QUERY = gql`
	query USERS_QUERY {
		user_table {
			id
			name
		}
	}
`

interface IUser {
	name: string
}

const Users = () => {
	const { loading, error, data } = useQuery(USERS_QUERY)

	if (!!loading) {
		return <p>Loading...</p>
	} else if (!!error) {
		return <p>{error.message}</p>
	}

	return (
		<div>
			{data.users.map((user: IUser) => (
				<p>{user.name}</p>
			))}
		</div>
	)
}

export default Users
