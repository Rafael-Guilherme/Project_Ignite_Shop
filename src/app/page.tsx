import { stripe } from "@/lib/stripe";
import ProductsList from "@/components/ProductsList";
import Stripe from "stripe";

export interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default async function Home() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
  
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
  
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    };
  });

  return <ProductsList products={products} />;
}