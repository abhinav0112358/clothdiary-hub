
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  category?: Product["category"];
}

export const ProductGrid = ({ products, category }: ProductGridProps) => {
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground py-12">
          No products found in this category.
        </p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

