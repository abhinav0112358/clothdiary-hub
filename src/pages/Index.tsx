
import { Hero } from "@/components/Hero";
import { Product } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Index() {
  // Sample products for each category
  const products: Product[] = [
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
      name: "Designer Tote",
      description: "Elegant designer tote bag",
      price: 39.99,
      category: "tote_bags",
      imageUrl: "/placeholder.svg",
      inventory: 30,
    },
    {
      id: "3",
      name: "Classic White T-Shirt",
      description: "Essential white t-shirt",
      price: 19.99,
      category: "tshirts",
      imageUrl: "/placeholder.svg",
      inventory: 100,
    },
    {
      id: "4",
      name: "Graphic T-Shirt",
      description: "Cool graphic design t-shirt",
      price: 24.99,
      category: "tshirts",
      imageUrl: "/placeholder.svg",
      inventory: 75,
    },
    {
      id: "5",
      name: "Patchwork Top",
      description: "Handcrafted patchwork top",
      price: 34.99,
      category: "patchwork",
      imageUrl: "/placeholder.svg",
      inventory: 25,
    },
    {
      id: "6",
      name: "Patchwork Shirt",
      description: "Unique patchwork shirt design",
      price: 39.99,
      category: "patchwork",
      imageUrl: "/placeholder.svg",
      inventory: 20,
    },
    {
      id: "7",
      name: "Leather Diary",
      description: "Handmade leather diary",
      price: 19.99,
      category: "diaries",
      imageUrl: "/placeholder.svg",
      inventory: 40,
    },
    {
      id: "8",
      name: "Fabric Diary",
      description: "Beautiful fabric covered diary",
      price: 14.99,
      category: "diaries",
      imageUrl: "/placeholder.svg",
      inventory: 35,
    },
    {
      id: "9",
      name: "Traditional Gamcha",
      description: "Authentic traditional gamcha",
      price: 9.99,
      category: "gamcha",
      imageUrl: "/placeholder.svg",
      inventory: 60,
    },
    {
      id: "10",
      name: "Modern Gamcha",
      description: "Contemporary gamcha design",
      price: 12.99,
      category: "gamcha",
      imageUrl: "/placeholder.svg",
      inventory: 45,
    },
    {
      id: "11",
      name: "Gift Box Set",
      description: "Curated gift box set",
      price: 49.99,
      category: "gifts",
      imageUrl: "/placeholder.svg",
      inventory: 30,
    },
    {
      id: "12",
      name: "Handmade Gift Set",
      description: "Artisanal handmade gift set",
      price: 44.99,
      category: "gifts",
      imageUrl: "/placeholder.svg",
      inventory: 25,
    },
    {
      id: "13",
      name: "Custom Design Kit",
      description: "Create your own design kit",
      price: 29.99,
      category: "custom",
      imageUrl: "/placeholder.svg",
      inventory: 40,
    },
    {
      id: "14",
      name: "Custom Print Set",
      description: "Personalized print set",
      price: 34.99,
      category: "custom",
      imageUrl: "/placeholder.svg",
      inventory: 35,
    },
  ];

  const categories = [
    { title: "Tote Bags", path: "/tote-bags", category: "tote_bags" as const },
    { title: "T-Shirts", path: "/t-shirts", category: "tshirts" as const },
    { title: "Patchwork", path: "/patchwork", category: "patchwork" as const },
    { title: "Diaries", path: "/diaries", category: "diaries" as const },
    { title: "Gamcha", path: "/gamcha", category: "gamcha" as const },
    { title: "Gifts", path: "/gifts", category: "gifts" as const },
    { title: "Create Your Own", path: "/custom", category: "custom" as const },
  ];

  return (
    <main className="min-h-screen">
      <Hero />
      {categories.map(({ title, path, category }) => {
        const categoryProducts = products.filter(
          (product) => product.category === category
        ).slice(0, 2);

        return (
          <section key={category} className="py-8 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display">{title}</h2>
                <Link to={path}>
                  <Button variant="ghost" className="font-medium">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <ProductGrid products={categoryProducts} />
            </div>
          </section>
        );
      })}
      <Footer />
    </main>
  );
}
