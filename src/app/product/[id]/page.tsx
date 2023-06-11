import Product from "@/components/Product"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export default async function Item({ params }: { params: { id: string } }) {
    const { id } = params

    const product = await stripe.products.retrieve(id, {
        expand:['default_price']
    })

    const price = product.default_price as Stripe.Price;
  
    const productDetails = {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      description: product.description,
      defaultPriceId: price.id
    }

    return (
        <Product productDetails={productDetails} />
    )
}