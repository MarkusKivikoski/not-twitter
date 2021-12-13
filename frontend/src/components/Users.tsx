import React from 'react'
import { gql, useQuery } from '@apollo/client'

const USERS_QUERY = gql`
	query USERS_QUERY {
		allUsers {
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

	!!data && console.log('users: ', data)

	if (!!loading) {
		return <p>Loading...</p>
	} else if (!!error) {
		return <p>{error.message}</p>
	} else
		return (
			<div>
				<h1>USERS</h1>
				{data.allUsers.map((user: IUser, index: number) => (
					<p key={index}>{user.name}</p>
				))}
			</div>
		)
}

export default Users
