import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import SupplierCard from '../components/SupplierCard';
import AddSupplierForm from '../components/AddSupplierForm';
import { useSuppliers } from '../hooks/useSuppliers';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Suppliers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { suppliers, isLoading } = useSuppliers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground mt-1">Manage your supplier relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
            </DialogHeader>
            <AddSupplierForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-lg border border-border/40 bg-card animate-pulse" />
          ))}
        </div>
      ) : suppliers.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border/40 rounded-lg">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No suppliers yet</h3>
          <p className="text-muted-foreground mb-4">Add your first supplier to start managing products</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id.toString()} supplier={supplier} />
          ))}
        </div>
      )}
    </div>
  );
}
