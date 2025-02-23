
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Your wishlist is empty. Start adding items you love!
        </p>
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

export default Wishlist;
