
import { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usdToInr } from "@/lib/currency";

interface OrdersListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: Order["status"]) => void;
}

export const OrdersList = ({ orders, onUpdateStatus }: OrdersListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Time Placed</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              {new Date(order.timePlaced).toLocaleString()}
            </TableCell>
            <TableCell>
              {order.items.map((item) => (
                <div key={item.productId} className="text-sm">
                  {item.quantity}x {item.name} (₹{usdToInr(item.price).toFixed(0)})
                </div>
              ))}
            </TableCell>
            <TableCell>₹{usdToInr(order.totalPrice).toFixed(0)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "completed"
                    ? "success"
                    : order.status === "cancelled"
                    ? "destructive"
                    : "default"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {order.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-500 text-white hover:bg-green-600"
                      onClick={() => onUpdateStatus(order.id, "completed")}
                    >
                      Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => onUpdateStatus(order.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
