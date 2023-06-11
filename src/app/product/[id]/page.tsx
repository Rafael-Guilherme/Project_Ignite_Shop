import { stripe } from "@/lib/stripe"
import Image from "next/image"
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
      description: product.description
    }


    return (
        <div className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] my-0 mx-auto">
            <div className="w-full max-w-[576px] h-[565px] bg-gradient-to-b from-teal-500 via-teal-600 to-purple-500 rounded p-2 flex items-center justify-center object-cover">
                <Image src={productDetails.imageUrl} width={520} height={480} alt='camiseta rocketseat' />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl text-gray300">{productDetails.name}</h1>
                <span className="mt-4 block text-2xl text-green300">{productDetails.price}</span>

                <p className="mt-10 text-xl leading-6 text-gray300">{productDetails.description}</p>

                <button className="mt-auto bg-green500 border-0 text-white rounded p-5 cursor-pointer font-bold text-xl hover:bg-green300">
                    Comprar Agora
                </button>
            </div>
        </div>
    )
}