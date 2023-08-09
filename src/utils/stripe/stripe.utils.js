import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
    process.env.REACT_APP_STRTIPE_PUBLISHABLE_KEY
);

