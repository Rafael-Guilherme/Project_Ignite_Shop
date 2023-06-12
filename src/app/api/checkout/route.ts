import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  const { priceId } = await req.json()

  if (!priceId) {
    return NextResponse.json({ error: 'Price not found' })
  }
  
    const successUrl = 'https://project-ignite-shop.vercel.app/success?session_id={CHECKOUT_SESSION_ID}'
    const cancelUrl = 'https://project-ignite-shop.vercel.app/'
  
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
  
    return NextResponse.json({
      checkoutUrl: checkoutSession.url
    })

}
