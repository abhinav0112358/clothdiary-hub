
import { useState } from "react";
import { Product } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";

const Diaries = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display mb-8">Diaries</h1>
      <ProductGrid products={products} category="diaries" />
    </div>
  );
};

export default Diaries;
