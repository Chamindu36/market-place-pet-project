import { useState } from "react";
import { useDispatch } from "react-redux";

import {
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.components";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // set only the updated values from the form
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        // resrict the default form submission
        event.preventDefault();
        try {
            // sign in with email and password
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert('Incorrect password');
            } else if (error.code === 'auth/user-not-found') {
                alert('User not found');
            } else {
                console.error('User sign in encountered an error: ', error);
            };
        };
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer >
    );
};

export default SignInForm;