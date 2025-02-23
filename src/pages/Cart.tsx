
import { useState, useEffect } from "react";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast({
      title: "Cart updated",
      description: "Your cart has been updated successfully.",
    });
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const total = cartItems.reduce((sum, item) => {
    const price = item.offer ? item.price * (1 - item.offer / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const usdToInr = (price: number) => Math.round(price * 83);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Your cart is empty. Start shopping!
        </p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="ml-auto"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{usdToInr(item.price).toFixed(0)}</p>
                  {item.offer && (
                    <p className="text-sm text-muted-foreground line-through">
                      ₹{usdToInr(item.price * (1 - item.offer / 100)).toFixed(0)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 border rounded-lg space-y-4">
              <h2 className="text-xl font-medium">Order Summary</h2>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">₹{usdToInr(total).toFixed(0)}</span>
              </div>
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
