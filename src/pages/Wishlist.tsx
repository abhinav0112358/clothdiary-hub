
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const { toast } = useToast();
  
  useEffect(() => {
    const handleWishlistUpdate = () => {
      const savedWishlist = localStorage.getItem("wishlist");
      setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);
    
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, []);

  const clearWishlist = () => {
    localStorage.setItem("wishlist", JSON.stringify([]));
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={clearWishlist}
          >
            <Trash2 className="h-4 w-4" />
            Clear Wishlist
          </Button>
        )}
      </div>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <div className="max-w-md mx-auto space-y-4">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground/60" />
            <p className="text-xl font-medium">Your wishlist is empty</p>
            <p className="text-muted-foreground">
              Items added to your wishlist will be saved here for you to revisit anytime.
            </p>
            <Button 
              variant="default" 
              className="mt-4"
              onClick={() => window.location.href = '/'}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

import { Heart } from "lucide-react";
export default Wishlist;
