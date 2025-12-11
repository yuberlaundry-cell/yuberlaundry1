// This is a placeholder for your Paystack webhook handler.
// In a real application, you would verify the webhook signature
// and handle various events (charge.success, subscription.create, etc.)
// to update your database and application state based on the currency and amount.

import { NextResponse } from 'next/server';
import crypto from 'crypto';

// It's crucial to store your Paystack secret key in environment variables
// and not hardcode it in your application.
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(req: Request) {
  // 1. Verify the webhook signature to ensure the request is from Paystack
  const signature = req.headers.get('x-paystack-signature');
  const body = await req.text(); // Read the raw body

  if (!signature) {
    console.error('No Paystack signature found on request');
    return new NextResponse('Webhook Error: No signature', { status: 400 });
  }

  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(body)
    .digest('hex');
    
  if (hash !== signature) {
    console.error('Invalid Paystack signature');
    return new NextResponse('Webhook Error: Invalid signature', { status: 401 });
  }

  // 2. Parse the event payload
  const event = JSON.parse(body);
  const data = event.data;

  // 3. Handle the event based on its type
  // Business logic should handle different currencies (data.currency) and amounts (data.amount).
  // The amount is in the subunit of the currency (e.g., kobo for NGN, cents for USD).
  switch (event.event) {
    case 'charge.success':
      console.log(`Payment successful for ${data.amount} ${data.currency}. Ref: ${data.reference}`);
      // Example: Fulfill order, update payment status in your DB.
      // Use data.currency to correctly interpret the amount.
      break;
    
    case 'subscription.create':
      console.log(`Subscription created for ${data.plan.name} at ${data.amount} ${data.plan.currency}.`);
      // Example: Activate subscription features for the user based on the plan code and currency.
      break;

    case 'refund.processed':
        console.log(`Refund of ${data.amount} ${data.currency} processed for transaction: ${data.transaction_reference}`);
        // Example: Update order to reflect the refund, using the correct currency.
        break;
        
    // Add other cases for events you want to handle, e.g.:
    // case 'invoice.payment_failed':
    // case 'customeridentification.failed':
    // case 'transfer.success':

    default:
      console.log(`Unhandled Paystack event type: ${event.event}`);
  }

  // 4. Acknowledge receipt of the event by returning a 200 OK response
  return new NextResponse('Webhook received', { status: 200 });
}
