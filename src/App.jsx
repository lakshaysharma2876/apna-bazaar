
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const App = () => (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
);

export default App;
