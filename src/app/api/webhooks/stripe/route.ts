import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-08-26.dahlia",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // For local development without webhook secret checking
      event = JSON.parse(body);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook signature verification failed:", msg);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const userId = checkoutSession.metadata?.userId;
        const customerId = checkoutSession.customer as string;
        const subscriptionId = checkoutSession.subscription as string;

        if (userId) {
          // Upgrade user to PRO
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: "PRO",
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
            },
          });

          // Create Subscription record
          await prisma.subscription.create({
            data: {
              userId: userId,
              planId: "Zeno Pro",
              status: "ACTIVE",
            }
          });
        }
        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        // Downgrade user back to FREE when subscription ends/fails
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            plan: "FREE",
          },
        });
        
        await prisma.subscription.updateMany({
          where: { planId: "Zeno Pro", user: { stripeSubscriptionId: subscription.id } },
          data: {
            status: "CANCELED",
            cancelDate: new Date()
          }
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Processing Error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
