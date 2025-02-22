
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { usdToInr } from "@/lib/currency";

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <>
      {products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No products yet. Click the button above to add your first product.
        </div>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ₹{usdToInr(product.price).toFixed(0)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
