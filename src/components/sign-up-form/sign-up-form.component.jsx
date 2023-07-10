import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const { useState } = require("react");

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

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

        // check if the passwords match
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        };

        // create the user upon sign up with email and password
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            // reset the form fields
            resetFormFields();
        } catch (error) {
            console.error('User creation on Firebase encountered an error: ', error);
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                alert('Error creating user');
            }
        };
    };

    return (
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Display Name
                </label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

                <label>
                    Email
                </label>
                <input type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <label>
                    Password
                </label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />

                <label>
                    Confirm Password
                </label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <button type="submit"> Sign Up </button>
            </form>
        </div>
    );
};

export default SignUpForm;