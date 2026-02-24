import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Supplier {
    id: bigint;
    contactInfo: string;
    name: string;
}
export type Time = bigint;
export interface CustomOrder {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    productId: bigint;
    timestamp: Time;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    retailPrice: number;
    name: string;
    wholesalePrice: number;
    description: string;
    supplierId: bigint;
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export interface backendInterface {
    addProduct(name: string, description: string, supplierId: bigint, wholesalePrice: number, retailPrice: number): Promise<bigint>;
    addSupplier(name: string, contactInfo: string): Promise<bigint>;
    calculateProductProfit(productId: bigint): Promise<number>;
    createOrder(productId: bigint, quantity: bigint, customerName: string): Promise<bigint>;
    getAllOrdersSortedByTimestamp(): Promise<Array<CustomOrder>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllSuppliers(): Promise<Array<Supplier>>;
    getOrder(orderId: bigint): Promise<CustomOrder>;
    getSupplierProducts(supplierId: bigint): Promise<Array<Product>>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
