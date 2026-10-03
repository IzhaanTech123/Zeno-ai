import { Stripe } from "stripe";

// Initialize Stripe with the secret key from environment variables
// Using a placeholder check to prevent crashes if the key isn't set yet during development
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  typescript: true,
  appInfo: {
    name: "Zeno AI",
    version: "1.0.0",
  },
});
