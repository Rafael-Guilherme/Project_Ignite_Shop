"use client"

import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { HomeProps } from "@/app/page";

export default function ProductsList({ products }: HomeProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48,
        }
    })

    return (
        <div
            ref={sliderRef}
            className="keen-slider flex w-full ml-auto min-h-[656px] overflow-hidden"
            style={{ maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))' }}
        >

            {products?.map(product => {
                return (
                    <Link 
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="keen-slider__slide group bg-gradient-to-b from-teal-500 via-teal-600 to-purple-500 rounded-lg p-1 relative flex items-center justify-center object-cover"
                    >
                        <Image src={product.imageUrl} width={520} height={480} alt='camiseta rocketseat' />

                        <footer
                            className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between bg-black bg-opacity-60 transform translate-y-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                            <strong className="text-xl">{product.name}</strong>
                            <span className="text-2xl font-bold text-green300">{product.price}</span>
                        </footer>
                    </Link>
                )
            })}
        </div>
    )
}

