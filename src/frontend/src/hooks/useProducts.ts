import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type Product } from '../backend';
import { useEffect, useState } from 'react';

export function useProducts(searchTerm: string) {
  const { actor, isFetching } = useActor();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const productsQuery = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const searchQuery = useQuery<Product[]>({
    queryKey: ['products', 'search', debouncedSearchTerm],
    queryFn: async () => {
      if (!actor || !debouncedSearchTerm) return [];
      return actor.searchProducts(debouncedSearchTerm);
    },
    enabled: !!actor && !isFetching && !!debouncedSearchTerm,
  });

  return {
    products: productsQuery.data || [],
    searchResults: searchQuery.data || [],
    isLoading: productsQuery.isLoading,
    isSearching: searchQuery.isLoading,
  };
}

export function useProduct(productId: bigint) {
  const { products } = useProducts('');
  const product = products.find((p) => p.id === productId);
  return { product };
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      supplierId: bigint;
      wholesalePrice: number;
      retailPrice: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addProduct(
        data.name,
        data.description,
        data.supplierId,
        data.wholesalePrice,
        data.retailPrice
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
