
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice = product.offer
    ? product.price * (1 - product.offer / 100)
    : product.price;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.offer > 0 && (
          <Badge className="absolute top-2 right-2 bg-destructive">
            {product.offer}% OFF
          </Badge>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground">
            ${discountedPrice.toFixed(2)}
          </p>
          {product.offer > 0 && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
