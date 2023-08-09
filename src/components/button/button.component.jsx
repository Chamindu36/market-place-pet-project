import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    if (buttonType === BUTTON_TYPE_CLASSES.inverted) {
        return InvertedButton;
    } else if (buttonType === BUTTON_TYPE_CLASSES.google) {
        return GoogleSignInButton;
    } else {
        return BaseButton;
    }
};


const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading}{...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
};
export default Button;
