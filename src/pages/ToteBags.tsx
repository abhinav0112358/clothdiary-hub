
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";

const ToteBags = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display mb-8">Tote Bags</h1>
      <ProductGrid products={products} category="tote_bags" />
    </div>
  );
};

export default ToteBags;

