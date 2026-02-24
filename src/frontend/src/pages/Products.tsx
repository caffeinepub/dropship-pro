import { useState } from 'react';
import { Plus, Search, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';
import AddProductForm from '../components/AddProductForm';
import { useProducts } from '../hooks/useProducts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { products, searchResults, isLoading, isSearching } = useProducts(searchTerm);

  const displayProducts = searchTerm ? searchResults : products;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <AddProductForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <ProductSearch value={searchTerm} onChange={setSearchTerm} />

      {isLoading || isSearching ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-lg border border-border/40 bg-card animate-pulse" />
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border/40 rounded-lg">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {searchTerm ? 'No products found' : 'No products yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Get started by adding your first product'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product) => (
            <ProductCard key={product.id.toString()} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
