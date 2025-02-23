import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types";

export default function Index() {
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Classic Tote Bag",
      description: "A versatile tote bag for everyday use",
      price: 29.99,
      category: "tote_bags",
      imageUrl: "/placeholder.svg",
      inventory: 50,
      offer: 10,
    },
    {
      id: "2",
      name: "Designer Diary",
      description: "Beautiful handcrafted diary",
      price: 19.99,
      category: "diaries",
      imageUrl: "/placeholder.svg",
      inventory: 30,
    },
  ];

  return (
    <main>
      <Hero />
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">₹{Math.round(product.price * 83)}</span>
                    <Link to={`/product/${product.id}`}>
                      <Button>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        View Product
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
