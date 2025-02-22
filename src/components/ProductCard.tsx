
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const discountedPrice = product.offer
    ? product.price * (1 - product.offer / 100)
    : product.price;

  // Convert USD to INR (approximate conversion rate)
  const usdToInr = (price: number) => Math.round(price * 83);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image w-full h-64 object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {product.offer > 0 && (
          <Badge className="absolute top-2 right-2 bg-destructive">
            {product.offer}% OFF
          </Badge>
        )}
      </Link>
      <div className="mt-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">
              ₹{usdToInr(discountedPrice).toFixed(0)}
            </p>
            {product.offer > 0 && (
              <p className="text-sm text-muted-foreground line-through">
                ₹{usdToInr(product.price).toFixed(0)}
              </p>
            )}
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
