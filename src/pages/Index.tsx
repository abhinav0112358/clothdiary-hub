
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setFeaturedProducts(JSON.parse(savedProducts));
    } else {
      // Fallback to demo products if no products have been added
      setFeaturedProducts([
        {
          id: "1",
          name: "Classic White Shirt",
          description: "Timeless elegance in pure cotton",
          price: 89.99,
          category: "clothing",
          imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          inventory: 10,
          offer: 0,
        },
        {
          id: "2",
          name: "Leather-bound Journal",
          description: "Premium leather diary",
          price: 49.99,
          category: "diary",
          imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
          inventory: 15,
          offer: 0,
        },
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="page-container">
        <h2 className="font-display text-3xl mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
