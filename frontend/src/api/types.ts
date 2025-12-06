export interface CategorySummary {
    id: string;
    name: string;
    productCount: number;
}

export interface Store {
    id: string;
    name: string;
    description: string | null;
    logoUrl: string | null;
    location: string | null;
    topCategories: CategorySummary[];
}

export interface StoreOption {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    description: string | null;
    quantity: number;
    price: number;
    imageUrl: string | null;
    storeId: string;
    categories: Category[];
}

export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
}