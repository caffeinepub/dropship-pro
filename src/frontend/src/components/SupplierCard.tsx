import { Mail, Package } from 'lucide-react';
import { type Supplier } from '../backend';
import { useSupplierProducts } from '../hooks/useSuppliers';
import { Badge } from '@/components/ui/badge';

interface SupplierCardProps {
  supplier: Supplier;
}

export default function SupplierCard({ supplier }: SupplierCardProps) {
  const { products, isLoading } = useSupplierProducts(supplier.id);

  return (
    <div className="rounded-lg border border-border/40 bg-card p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">{supplier.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{supplier.contactInfo}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </span>
            <Badge variant="secondary">{isLoading ? '...' : products.length}</Badge>
          </div>
          {!isLoading && products.length > 0 && (
            <div className="space-y-1">
              {products.slice(0, 3).map((product) => (
                <div key={product.id.toString()} className="text-sm text-muted-foreground">
                  • {product.name}
                </div>
              ))}
              {products.length > 3 && (
                <div className="text-sm text-muted-foreground">
                  + {products.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
