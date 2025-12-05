export interface Store {
    id: string;
    name: string;
    description: string | null;
    logoUrl: string | null;
    location: string | null;
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