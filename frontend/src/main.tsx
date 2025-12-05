import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Store, Product, CreateStore, CreateProduct } from "./pages";
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
          <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
