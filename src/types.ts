
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "tote_bags" | "tshirts" | "patchwork" | "diaries" | "gamcha" | "gifts" | "custom";
  imageUrl: string;
  inventory: number;
  offer?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  timePlaced: string;
  totalPrice: number;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  status: "pending" | "completed" | "cancelled";
}

