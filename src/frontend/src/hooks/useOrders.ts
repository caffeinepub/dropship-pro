import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type CustomOrder, type OrderStatus } from '../backend';

export function useOrders() {
  const { actor, isFetching } = useActor();

  const ordersQuery = useQuery<CustomOrder[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrdersSortedByTimestamp();
    },
    enabled: !!actor && !isFetching,
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
  };
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { productId: bigint; quantity: bigint; customerName: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createOrder(data.productId, data.quantity, data.customerName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { orderId: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateOrderStatus(data.orderId, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
