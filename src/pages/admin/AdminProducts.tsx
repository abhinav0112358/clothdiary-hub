import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl">Products</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="bg-card rounded-lg p-6">
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
                        ${product.price.toFixed(2)}
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
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;