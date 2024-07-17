import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./index.css";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import Cities from "./components/Cities/Cities";
import Countries from "./components/Countries/Countries";
import CityDetails from "./components/CityDetails/CityDetails";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";

import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/AuthenticationContext";

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<Cities />} />
                <Route path="countries" element={<Countries />} />
                <Route path="cities/:id" element={<CityDetails />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<Navigate to="/app" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
