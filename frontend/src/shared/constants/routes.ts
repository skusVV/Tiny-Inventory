export const ROUTES = {
  HOME: "/",
  CREATE_STORE: "/store/create",
  STORE: "/store/:id",
  CREATE_PRODUCT: "/store/:storeId/product/create",
  PRODUCT: "/product/:id",
} as const;

export const buildStoreRoute = (id: string) => `/store/${id}`;
export const buildProductRoute = (id: string) => `/product/${id}`;
export const buildCreateProductRoute = (storeId: string) => `/store/${storeId}/product/create`;

export const isStoreRoute = (pathname: string) => pathname.startsWith("/store/");
export const isProductRoute = (pathname: string) => pathname.startsWith("/product/");

