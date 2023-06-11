import Image from "next/image"
import { redirect } from "next/navigation"
import Link from "next/link"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"

export default async function Success({ searchParams }: { searchParams: { session_id: string } }) {
    const sessionId = searchParams.session_id

    if (!sessionId) {
        return redirect('/')
    }
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name
    const product = session.line_items?.data[0].price?.product as Stripe.Product

    return (
        <div className="flex flex-col items-center justify-center my-0 mx-auto h-[656px]">
            <h1 className="text-2xl text-gray100">Compra efetuada!</h1>

            <div className="mt-16 w-full max-w-[130px] bg-gradient-to-b from-teal-500 via-teal-600 to-purple-500 rounded-lg p-1 flex flex-col items-center justify-center">
                <Image className="object-cover" src={product.images[0]} width={130} height={130} alt='' />
            </div>
                <p className="mt-8 text-xl text-gray300 max-w-xl text-center leading-5">
                    Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
                </p>

                <Link className="mt-20 block text-lg text-green500 hover:text-green300" href="/">
                    Voltar ao catálogo
                </Link>
        </div>
    )
}