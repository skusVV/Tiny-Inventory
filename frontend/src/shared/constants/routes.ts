export const ROUTES = {
  HOME: "/",
  CREATE_STORE: "/store/create",
  STORE: "/store/:id",
  EDIT_STORE: "/store/:id/edit",
  CREATE_PRODUCT: "/store/:storeId/product/create",
  CREATE_PRODUCT_GLOBAL: "/product/create",
  ALL_PRODUCTS: "/products",
  PRODUCT: "/product/:id",
  EDIT_PRODUCT: "/product/:id/edit",
} as const;

export const buildStoreRoute = (id: string) => `/store/${id}`;
export const buildEditStoreRoute = (id: string) => `/store/${id}/edit`;
export const buildProductRoute = (id: string) => `/product/${id}`;
export const buildEditProductRoute = (id: string) => `/product/${id}/edit`;
export const buildCreateProductRoute = (storeId: string) => `/store/${storeId}/product/create`;

export const isStoreRoute = (pathname: string) => pathname.startsWith("/store/");
export const isProductRoute = (pathname: string) => pathname.startsWith("/product/");

