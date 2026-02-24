import { TrendingUp, Package, ShoppingCart, Clock, DollarSign } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';

export default function Dashboard() {
  const { metrics, isLoading } = useDashboardMetrics();

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-600/10 p-8 border border-border/40">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1200x600.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to DropShip Pro</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage your drop shipping business with ease. Track products, orders, and suppliers all in one place.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Business Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Products"
            value={isLoading ? '...' : metrics.totalProducts.toString()}
            icon={Package}
            description="Available for sale"
          />
          <MetricCard
            title="Active Orders"
            value={isLoading ? '...' : metrics.activeOrders.toString()}
            icon={ShoppingCart}
            description="In progress"
          />
          <MetricCard
            title="Pending Orders"
            value={isLoading ? '...' : metrics.pendingOrders.toString()}
            icon={Clock}
            description="Awaiting processing"
          />
          <MetricCard
            title="Total Revenue"
            value={isLoading ? '...' : `$${metrics.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            description="From all orders"
            trend={metrics.totalRevenue > 0 ? 'up' : undefined}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border/40 bg-card p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Stats
          </h3>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average Order Value</span>
              <span className="font-semibold">
                {isLoading
                  ? '...'
                  : metrics.activeOrders > 0
                  ? `$${(metrics.totalRevenue / metrics.activeOrders).toFixed(2)}`
                  : '$0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Products per Supplier</span>
              <span className="font-semibold">
                {isLoading
                  ? '...'
                  : metrics.totalSuppliers > 0
                  ? (metrics.totalProducts / metrics.totalSuppliers).toFixed(1)
                  : '0'}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/40 bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
          <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Add suppliers to manage your vendor relationships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Create products with wholesale and retail pricing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Process orders and track their status</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
