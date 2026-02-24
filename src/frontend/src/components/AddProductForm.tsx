import { useState } from 'react';
import { useAddProduct } from '../hooks/useProducts';
import { useSuppliers } from '../hooks/useSuppliers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddProductFormProps {
  onSuccess: () => void;
}

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');

  const { suppliers } = useSuppliers();
  const { mutate: addProduct, isPending } = useAddProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !supplierId || !wholesalePrice || !retailPrice) return;

    addProduct(
      {
        name,
        description,
        supplierId: BigInt(supplierId),
        wholesalePrice: parseFloat(wholesalePrice),
        retailPrice: parseFloat(retailPrice),
      },
      {
        onSuccess: () => {
          setName('');
          setDescription('');
          setSupplierId('');
          setWholesalePrice('');
          setRetailPrice('');
          onSuccess();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier</Label>
        <Select value={supplierId} onValueChange={setSupplierId}>
          <SelectTrigger id="supplier">
            <SelectValue placeholder="Select a supplier" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier.id.toString()} value={supplier.id.toString()}>
                {supplier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="wholesalePrice">Wholesale Price</Label>
          <Input
            id="wholesalePrice"
            type="number"
            step="0.01"
            min="0"
            value={wholesalePrice}
            onChange={(e) => setWholesalePrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="retailPrice">Retail Price</Label>
          <Input
            id="retailPrice"
            type="number"
            step="0.01"
            min="0"
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Product'}
      </Button>
    </form>
  );
}
