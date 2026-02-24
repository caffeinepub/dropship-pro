import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type Supplier, type Product } from '../backend';

export function useSuppliers() {
  const { actor, isFetching } = useActor();

  const suppliersQuery = useQuery<Supplier[]>({
    queryKey: ['suppliers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSuppliers();
    },
    enabled: !!actor && !isFetching,
  });

  return {
    suppliers: suppliersQuery.data || [],
    isLoading: suppliersQuery.isLoading,
  };
}

export function useSupplier(supplierId: bigint) {
  const { suppliers } = useSuppliers();
  const supplier = suppliers.find((s) => s.id === supplierId);
  return { supplier };
}

export function useSupplierProducts(supplierId: bigint) {
  const { actor, isFetching } = useActor();

  const productsQuery = useQuery<Product[]>({
    queryKey: ['suppliers', supplierId.toString(), 'products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSupplierProducts(supplierId);
    },
    enabled: !!actor && !isFetching,
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
  };
}

export function useAddSupplier() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; contactInfo: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addSupplier(data.name, data.contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
}
