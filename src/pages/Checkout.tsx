
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { CartItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";

// Form schema for shipping details
const shippingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
});

const steps = ["Shipping Details", "Payment Method", "Review Order"];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load cart items from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length === 0) {
        toast({
          title: "Empty Cart",
          description: "Your cart is empty. Please add items before checkout.",
        });
        navigate("/cart");
      } else {
        setCartItems(parsedCart);
      }
    } else {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
      });
      navigate("/cart");
    }
  }, [navigate, toast]);

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.offer ? item.price * (1 - item.offer / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = 4.99;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  const usdToInr = (price: number) => Math.round(price * 83);

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: z.infer<typeof shippingSchema>) => {
    // Save shipping details in localStorage
    localStorage.setItem("shippingDetails", JSON.stringify(data));
    setCurrentStep(1);
  };

  const handlePaymentSelect = (method: "cash" | "card") => {
    setPaymentMethod(method);
  };

  const handleReviewOrder = () => {
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    // Process the order
    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully.",
    });
    
    // Clear the cart
    localStorage.setItem("cart", JSON.stringify([]));
    
    // Save order details for the success page
    localStorage.setItem("lastOrder", JSON.stringify({
      items: cartItems,
      total: total,
      shippingDetails: JSON.parse(localStorage.getItem("shippingDetails") || "{}"),
      paymentMethod: paymentMethod,
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
    }));
    
    // Navigate to success page
    navigate("/order-success");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display mb-8">Checkout</h1>

      {/* Checkout Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center">
            <div className={`flex flex-col items-center ${idx <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
              {idx < currentStep ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : idx === currentStep ? (
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center">
                  {idx + 1}
                </div>
              ) : (
                <CircleDashed className="h-8 w-8" />
              )}
              <span className="text-sm mt-2">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-24 h-0.5 mx-2 ${idx < currentStep ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Shipping Details */}
          {currentStep === 0 && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Shipping Details</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="johndoe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Maharashtra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full">Continue to Payment</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {/* Step 2: Payment Method */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div 
                    className={`p-4 border rounded-md cursor-pointer flex items-center gap-4 ${paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-muted"}`}
                    onClick={() => handlePaymentSelect("cash")}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-primary" : "border-muted-foreground"}`}>
                      {paymentMethod === "cash" && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                    </div>
                    <div>
                      <h3 className="font-medium">Cash on Delivery</h3>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-md cursor-pointer flex items-center gap-4 ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-muted"}`}
                    onClick={() => handlePaymentSelect("card")}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-primary" : "border-muted-foreground"}`}>
                      {paymentMethod === "card" && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                    </div>
                    <div>
                      <h3 className="font-medium">Credit/Debit Card</h3>
                      <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(0)}>Back</Button>
                    <Button className="flex-1" onClick={handleReviewOrder}>Review Order</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Step 3: Review Order */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Review Order</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{usdToInr((item.offer ? item.price * (1 - item.offer / 100) : item.price) * item.quantity).toFixed(0)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Shipping Details</h3>
                    {form.getValues() && (
                      <div className="text-sm space-y-1">
                        <p>{form.getValues().name}</p>
                        <p>{form.getValues().address}</p>
                        <p>{form.getValues().city}, {form.getValues().state} {form.getValues().zipCode}</p>
                        <p>Phone: {form.getValues().phone}</p>
                        <p>Email: {form.getValues().email}</p>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Payment Method</h3>
                    <p>{paymentMethod === "cash" ? "Cash on Delivery" : "Credit/Debit Card"}</p>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                    <Button className="flex-1" onClick={handlePlaceOrder}>Place Order</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{usdToInr(subtotal).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{usdToInr(shipping).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{usdToInr(tax).toFixed(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{usdToInr(total).toFixed(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-muted p-4 rounded-md text-sm text-muted-foreground">
              <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
