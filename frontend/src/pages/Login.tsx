import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

interface ILoginValues {
	email: string
	password: string
}

const initialValues: ILoginValues = {
	email: '',
	password: '',
}

const validationSchema = yup.object({
	email: yup.string().email('Invalid email address').required('Email Required'),
	password: yup
		.string()
		.max(20, 'Must be 20 characters or less')
		.required('Password Required'),
})

const Login = () => {
	const [submitting, setSubmitting] = useState<boolean>(false)
	const navigate = useNavigate()
	const [login, { data }] = useMutation(LOGIN_MUTATION)

	const handleSubmit = async (values: any) => {
		setSubmitting(true)
		console.log('before response: ', values)
		const response = await login({
			variables: values,
		})
		localStorage.setItem('token', response.data.login.token)
		console.log('jälkeen responsen: ', response)
		setSubmitting(false)
		navigate('/users')
	}

	return (
		<div>
			<h3>Log in</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<Field name="email" type="text" placeholder="Email" />
					<ErrorMessage name="email" component={'div'} />
					<Field name="password" type="password" placeholder="Password" />
					<ErrorMessage name="password" component={'div'} />
					<button type="submit" disabled={submitting} className="login-button">
						<span>Login</span>
					</button>
				</Form>
			</Formik>
			<div className="register">
				<h4>Don't have an account yet?</h4>
				<Link to="/signup">
					<span>Sign up</span>
				</Link>
			</div>
		</div>
	)
}

export default Login
