import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Store, Product, CreateStore, EditStore, CreateProduct, EditProduct, AllProducts } from "./pages";
import { ROUTES } from "./shared";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<App />} />
          <Route path={ROUTES.CREATE_STORE} element={<CreateStore />} />
          <Route path={ROUTES.STORE} element={<Store />} />
          <Route path={ROUTES.EDIT_STORE} element={<EditStore />} />
          <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={ROUTES.CREATE_PRODUCT_GLOBAL} element={<CreateProduct />} />
          <Route path={ROUTES.ALL_PRODUCTS} element={<AllProducts />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
          <Route path={ROUTES.EDIT_PRODUCT} element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
