import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        // sign in with google popup
        const { user } = await signInWithGooglePopup();
        // create the user upon sign in
        await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
            <SignUpForm />
        </div>
    );
}
export default SignIn;