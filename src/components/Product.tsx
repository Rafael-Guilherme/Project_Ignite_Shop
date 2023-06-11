"use client"

import Image from "next/image"
import { useState } from "react";
import axios from "axios";

interface ProductDetails {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string | null;
    defaultPriceId: string;
  }
  
  interface ProductProps {
    productDetails: ProductDetails;
  }

export default function Product({ productDetails }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { defaultPriceId } = productDetails


    const handleBuyProduct = async () => {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: defaultPriceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            // concectar com uma ferramenta de usabilidade (Datadog / Sentry)
            console.log(err)
            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout')
        }
    }

    return (
        <div className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] my-0 mx-auto">
            <div className="w-full max-w-[576px] h-[565px] bg-gradient-to-b from-teal-500 via-teal-600 to-purple-500 rounded-lg p-2 flex items-center justify-center">
                <Image className="object-cover" src={productDetails.imageUrl} width={520} height={480} alt='camiseta rocketseat' />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl text-gray300">{productDetails.name}</h1>
                <span className="mt-4 block text-2xl text-green300">{productDetails.price}</span>

                <p className="mt-10 text-xl leading-6 text-gray300">{productDetails.description}</p>

                <button
                    disabled={isCreatingCheckoutSession}
                    onClick={handleBuyProduct}
                    className={`
                        mt-auto bg-green500 border-0 text-white rounded p-5 cursor-pointer font-bold text-xl hover:bg-green300 
                        ${isCreatingCheckoutSession && 'opacity-60 cursor-not-allowed' }
                    `}
                >
                    Comprar Agora
                </button>
            </div>
        </div>
    )
}