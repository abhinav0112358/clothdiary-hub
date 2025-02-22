
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Order, Product } from "@/types";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProductsList } from "./components/ProductsList";
import { OrdersList } from "./components/OrdersList";
import { AddProductDialog } from "./components/AddProductDialog";

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders
      ? JSON.parse(savedOrders)
      : [
          {
            id: "ORD001",
            customerName: "John Doe",
            timePlaced: new Date().toISOString(),
            totalPrice: 199.98,
            items: [
              {
                productId: "1",
                name: "Classic White Shirt",
                quantity: 2,
                price: 89.99,
              },
            ],
            status: "pending",
          },
        ];
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    inventory: "",
    offer: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct({
      ...newProduct,
      category: value,
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category as "clothing" | "diary",
      imageUrl: newProduct.imageUrl,
      inventory: parseInt(newProduct.inventory),
      offer: parseFloat(newProduct.offer || "0"),
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    toast({
      title: "Product added successfully",
      description: "The product has been added to your catalog.",
    });

    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      inventory: "",
      offer: "",
    });
    setIsDialogOpen(false);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Tabs defaultValue="products">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h1 className="font-display text-3xl">Dashboard</h1>
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <AddProductDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleAddProduct}
                product={newProduct}
                onInputChange={handleInputChange}
                onCategoryChange={handleCategoryChange}
              />
            </Dialog>
          </div>

          <TabsContent value="products" className="bg-card rounded-lg p-6">
            <ProductsList products={products} />
          </TabsContent>

          <TabsContent value="orders" className="bg-card rounded-lg">
            <OrdersList 
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProducts;
