
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Truck } from "lucide-react";
import { CartItem } from "@/types";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "date-fns";

interface OrderDetails {
  items: CartItem[];
  total: number;
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  paymentMethod: string;
  orderId: string;
  date: string;
}

const OrderSuccess = () => {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const orderData = localStorage.getItem("lastOrder");
    if (orderData) {
      setOrder(JSON.parse(orderData));
    } else {
      navigate("/");
    }
  }, [navigate]);
  
  const usdToInr = (price: number) => Math.round(price * 83);
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }
  
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-display mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We've received your order and will begin processing it right away.
          </p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" /> Order Details
                </h2>
                <span className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-muted-foreground mb-2">Order Number</h3>
                  <p className="font-mono font-medium">{order.orderId}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground mb-2">Payment Method</h3>
                  <p>{order.paymentMethod === "cash" ? "Cash on Delivery" : "Credit/Debit Card"}</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium text-muted-foreground mb-4">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
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
              
              <Separator className="my-6" />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{usdToInr(order.total).toFixed(0)}</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5" /> Shipping Address
                </h3>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.shippingDetails.name}</p>
                  <p>{order.shippingDetails.address}</p>
                  <p>
                    {order.shippingDetails.city}, {order.shippingDetails.state}{" "}
                    {order.shippingDetails.zipCode}
                  </p>
                  <p>Phone: {order.shippingDetails.phone}</p>
                  <p>Email: {order.shippingDetails.email}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5" /> Delivery Information
                </h3>
                <div className="text-sm space-y-4">
                  <div>
                    <p className="text-muted-foreground">Estimated Delivery Date</p>
                    <p className="font-medium">{estimatedDelivery.toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistance(estimatedDelivery, new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shipping Method</p>
                    <p className="font-medium">Standard Shipping</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Button asChild className="flex-1">
              <Link to="/">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
