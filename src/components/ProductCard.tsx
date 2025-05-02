
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { addToWishlist, isInWishlist } from "@/lib/wishlist";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const [inWishlist, setInWishlist] = useState(false);
  
  const discountedPrice = product.offer
    ? product.price * (1 - product.offer / 100)
    : product.price;

  // Convert USD to INR (approximate conversion rate)
  const usdToInr = (price: number) => Math.round(price * 83);

  useEffect(() => {
    setInWishlist(isInWishlist(product.id));
  }, [product.id]);

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

  const toggleWishlist = () => {
    const isAdded = addToWishlist(product);
    localStorage.setItem("wishlist", JSON.stringify(JSON.parse(localStorage.getItem("wishlist") || "[]")));
    
    setInWishlist(isAdded);
    
    toast({
      title: isAdded ? "Added to wishlist" : "Removed from wishlist",
      description: `${product.name} has been ${isAdded ? "added to" : "removed from"} your wishlist.`,
    });
    
    // Dispatch event to update wishlist count in navbar
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="product-card group relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist();
        }}
      >
        <Heart 
          className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
        />
      </Button>

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
