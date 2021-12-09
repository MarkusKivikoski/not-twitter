import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const SIGNUP_MUTATION = gql`
	mutation signup($name: String, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
			token
		}
	}
`

interface ISignupValues {
	email: string
	password: string
	confirmPassword: string
	name: string
}

const initialValues: ISignupValues = {
	email: '',
	password: '',
	confirmPassword: '',
	name: '',
}

const validationSchema = yup.object({
	email: yup.string().email('Invalid email address').required('Email Required'),
	password: yup
		.string()
		.max(20, 'Must be 20 characters or less')
		.required('Password Required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null])
		.required('Passwords must match'),

	name: yup
		.string()
		.max(15, 'Must be 15 characters or less')
		.required('Name Required'),
})

const Signup = () => {
	const [submitting, setSubmitting] = useState<boolean>(false)
	const navigate = useNavigate()
	const [signup, { data }] = useMutation(SIGNUP_MUTATION)

	const handleSubmit = async (values: any) => {
		setSubmitting(true)
		console.log('before response: ', values)
		const response = await signup({
			variables: values,
		})
		localStorage.setItem('token', response.data.signup.token)
		console.log('jälkeen responsen + token: ', response)
		setSubmitting(false)
		navigate('/users')
	}

	return (
		<div>
			<h1>SIGNUP</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<Field name="email" type="text" placeholder="Email" />
					<ErrorMessage name="email" component={'div'} />
					<Field name="name" type="text" placeholder="Name" />
					<ErrorMessage name="name" component={'div'} />
					<Field name="password" type="password" placeholder="Password" />
					<ErrorMessage name="password" component={'div'} />
					<Field
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
					/>
					<ErrorMessage name="confirmPassword" component={'div'} />
					<button type="submit" disabled={submitting}>
						Signup
					</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Signup
