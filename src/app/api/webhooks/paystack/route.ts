// This is a placeholder for your Paystack webhook handler.
// In a real application, you would verify the webhook signature
// and handle various events (charge.success, subscription.create, etc.)
// to update your database and application state.

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

  // 3. Handle the event based on its type
  // This is where you would add your business logic.
  // For example, update an order status, provision a service, etc.
  switch (event.event) {
    case 'charge.success':
      const transactionData = event.data;
      console.log(`Payment successful for transaction: ${transactionData.reference}`);
      // Example: Fulfill order, update payment status in your DB.
      break;
    
    case 'subscription.create':
      const subscriptionData = event.data;
      console.log(`Subscription created: ${subscriptionData.subscription_code}`);
      // Example: Activate subscription features for the user.
      break;

    case 'refund.processed':
        const refundData = event.data;
        console.log(`Refund processed for transaction: ${refundData.transaction_reference}`);
        // Example: Update order to reflect the refund.
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
