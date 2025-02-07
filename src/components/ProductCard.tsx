import { Link } from "react-router-dom";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};