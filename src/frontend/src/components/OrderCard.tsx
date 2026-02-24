import { Calendar, User, Package, DollarSign } from 'lucide-react';
import { type CustomOrder, OrderStatus } from '../backend';
import { useProduct } from '../hooks/useProducts';
import OrderStatusBadge from './OrderStatusBadge';
import { useUpdateOrderStatus } from '../hooks/useOrders';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderCardProps {
  order: CustomOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  const { product } = useProduct(order.productId);
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const totalPrice = product ? Number(product.retailPrice) * Number(order.quantity) : 0;
  const profit = product
    ? (Number(product.retailPrice) - Number(product.wholesalePrice)) * Number(order.quantity)
    : 0;

  const handleStatusChange = (newStatus: string) => {
    updateStatus({ orderId: order.id, status: newStatus as OrderStatus });
  };

  return (
    <div className="rounded-lg border border-border/40 bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/truck-icon.dim_128x128.png"
            alt="Order"
            className="h-12 w-12 opacity-60"
          />
          <div>
            <h3 className="font-semibold text-lg">Order #{order.id.toString()}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              {new Date(Number(order.timestamp) / 1000000).toLocaleDateString()}
            </p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-medium">{order.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Product:</span>
            <span className="font-medium">{product?.name || 'Loading...'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">{order.quantity.toString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border/40 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Profit: </span>
          <span className="font-semibold text-primary">${profit.toFixed(2)}</span>
        </div>
        <Select value={order.status} onValueChange={handleStatusChange} disabled={isPending}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
