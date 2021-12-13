import React from 'react'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({
	children,
	authenticated,
}: {
	children: JSX.Element
	authenticated: boolean
}) => {
	const navigate = useNavigate()

	if (!authenticated) {
		navigate('/login')
	}

	return children
}

export default RequireAuth
