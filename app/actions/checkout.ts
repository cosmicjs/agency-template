'use server';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(stripe_product_ids: string[], redirect_url: string) {
  try {
    let line_items = [];
    let mode = "payment";
    
    for (const stripe_product_id of stripe_product_ids) {
      const product = await stripe.products.retrieve(stripe_product_id);
      const price = await stripe.prices.retrieve(product.default_price);
      line_items.push({
        price: price.id,
        quantity: 1,
      });
      // If any items are recurring
      if (price.type === "recurring") mode = "subscription";
    }
    
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url: `${redirect_url}/?success=true`,
      cancel_url: `${redirect_url}/?canceled=true`,
    });
    
    return { url: session.url };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
