import React, {useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import {
	SignInContainer,
	SignInTitle,
	ButtonsBarContainer,
} from './sign-in.styles';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const {email, password} = userCredentials;
	const handleSubmit = async (event) => {
		event.preventDefault();
		emailSignInStart(email, password);
		setCredentials({email: '', password: ''});
	/*	try {
			await auth.signInWithEmailAndPassword(email, password);
			setCredentials({email: '', password: ''});
		} catch (error) {
			console.log(error);
		}*/
	};

	const handleChange = (event) => {
		const {value, name} = event.target;

		setCredentials({...userCredentials, [name]: value});
	};

	return (
		//const {googleSignInStart} =this.
		<SignInContainer>
			<SignInTitle>I already have an account</SignInTitle>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					name='email'
					type='email'
					handleChange={handleChange}
					value={email}
					label='email'
					required
				/>
				<FormInput
					name='password'
					type='password'
					value={password}
					handleChange={handleChange}
					label='password'
					required
				/>
				<ButtonsBarContainer>
					<CustomButton type='submit'> Sign in </CustomButton>
					<CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
						Sign in with Google
					</CustomButton>
				</ButtonsBarContainer>
			</form>
		</SignInContainer>
	);
};

const mapDispatchtoProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password )=> dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchtoProps) (SignIn);
