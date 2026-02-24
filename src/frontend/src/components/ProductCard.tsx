import { DollarSign, TrendingUp } from 'lucide-react';
import { type Product } from '../backend';
import { useSupplier } from '../hooks/useSuppliers';
import { calculateProfitMargin } from '../utils/profitCalculations';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { supplier } = useSupplier(product.supplierId);
  const profitMargin = calculateProfitMargin(product.wholesalePrice, product.retailPrice);

  return (
    <div className="rounded-lg border border-border/40 bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 flex items-center justify-center">
        <img
          src="/assets/generated/package-icon.dim_128x128.png"
          alt={product.name}
          className="h-20 w-20 opacity-60"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Supplier</span>
            <span className="font-medium">{supplier?.name || 'Loading...'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Wholesale</span>
            <span className="font-medium">${product.wholesalePrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Retail</span>
            <span className="font-semibold text-primary">${product.retailPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Profit Margin</span>
            <Badge variant="default" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              ${profitMargin.toFixed(2)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
