import { useState } from 'react';
import { useAddSupplier } from '../hooks/useSuppliers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddSupplierFormProps {
  onSuccess: () => void;
}

export default function AddSupplierForm({ onSuccess }: AddSupplierFormProps) {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const { mutate: addSupplier, isPending } = useAddSupplier();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactInfo) return;

    addSupplier(
      { name, contactInfo },
      {
        onSuccess: () => {
          setName('');
          setContactInfo('');
          onSuccess();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Supplier Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter supplier name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Information</Label>
        <Input
          id="contactInfo"
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder="Email or phone number"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Supplier'}
      </Button>
    </form>
  );
}
