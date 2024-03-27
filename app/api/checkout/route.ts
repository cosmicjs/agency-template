// app/api/submissions/route.ts
import { type NextRequest } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const res = await request.json();
  try {
    const product = await stripe.products.retrieve(res.stripe_product_id);
    const price = await stripe.prices.retrieve(product.default_price);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${res.redirect_url}/?success=true`,
      cancel_url: `${res.redirect_url}/?canceled=true`,
    });
    return Response.json({ url: session.url});
  } catch (err) {
    return Response.json(err);
  }
}