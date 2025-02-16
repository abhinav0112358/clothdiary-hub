
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "clothing" | "diary";
  imageUrl: string;
  inventory: number;
  offer?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
