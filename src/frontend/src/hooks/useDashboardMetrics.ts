import { useProducts } from './useProducts';
import { useOrders } from './useOrders';
import { useSuppliers } from './useSuppliers';

export function useDashboardMetrics() {
  const { products, isLoading: productsLoading } = useProducts('');
  const { orders, isLoading: ordersLoading } = useOrders();
  const { suppliers, isLoading: suppliersLoading } = useSuppliers();

  const activeOrders = orders.filter(
    (order) => order.status === 'pending' || order.status === 'processing' || order.status === 'shipped'
  );
  const pendingOrders = orders.filter((order) => order.status === 'pending');

  const totalRevenue = orders.reduce((sum, order) => {
    const product = products.find((p) => p.id === order.productId);
    if (product) {
      return sum + Number(product.retailPrice) * Number(order.quantity);
    }
    return sum;
  }, 0);

  return {
    metrics: {
      totalProducts: products.length,
      activeOrders: activeOrders.length,
      pendingOrders: pendingOrders.length,
      totalRevenue,
      totalSuppliers: suppliers.length,
    },
    isLoading: productsLoading || ordersLoading || suppliersLoading,
  };
}
