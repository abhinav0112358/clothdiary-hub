
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import AdminProducts from "./pages/admin/AdminProducts";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ToteBags from "./pages/ToteBags";
import TShirts from "./pages/TShirts";
import Patchwork from "./pages/Patchwork";
import Diaries from "./pages/Diaries";
import Gamcha from "./pages/Gamcha";
import Gifts from "./pages/Gifts";
import Custom from "./pages/Custom";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tote-bags" element={<ToteBags />} />
          <Route path="/t-shirts" element={<TShirts />} />
          <Route path="/patchwork" element={<Patchwork />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/gamcha" element={<Gamcha />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
