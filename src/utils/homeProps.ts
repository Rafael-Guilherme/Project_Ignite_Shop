export interface HomeProps {
    products: {
      id: string;
      name: string;
      imageUrl: string;
      price: string;
      defaultPriceId?: string
    }[]
  }