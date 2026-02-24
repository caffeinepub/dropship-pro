import { useState } from 'react';
import { useCreateOrder } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateOrderFormProps {
  onSuccess: () => void;
}

export default function CreateOrderForm({ onSuccess }: CreateOrderFormProps) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [customerName, setCustomerName] = useState('');

  const { products } = useProducts('');
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity || !customerName) return;

    createOrder(
      {
        productId: BigInt(productId),
        quantity: BigInt(quantity),
        customerName,
      },
      {
        onSuccess: () => {
          setProductId('');
          setQuantity('1');
          setCustomerName('');
          onSuccess();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="product">Product</Label>
        <Select value={productId} onValueChange={setProductId}>
          <SelectTrigger id="product">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id.toString()} value={product.id.toString()}>
                {product.name} - ${product.retailPrice.toFixed(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Order'}
      </Button>
    </form>
  );
}
