import { useState,FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.components";
import { SignUpContainer } from "./sign-up-form.styles";

import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // set only the updated values from the form
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // resrict the default form submission
        event.preventDefault();

        // check if the passwords match
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        };

        // create the user upon sign up with email and password
        try {
            dispatch(signUpStart(email, password, displayName));
            // reset the form fields
            resetFormFields();
        } catch (error) {
            console.error('User creation on Firebase encountered an error: ', error);

            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Email already in use');
            } else {
                alert('Error creating user');
            }
        };
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />


                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />


                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <Button type="submit" > Sign Up </Button>
            </form>
        </SignUpContainer >
    );
};

export default SignUpForm;