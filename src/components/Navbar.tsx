
import { Link } from "react-router-dom";
import { ShoppingCart, Settings, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate("/");
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <div className="w-full bg-[#FFD580] text-center py-2">
        Get 10% off On Your First Order 💝
      </div>
      <nav className="sticky top-0 z-50 w-full bg-white border-b">
        <div className="container mx-auto flex flex-col items-center px-4 py-4">
          <Link to="/" className="mb-4">
            <img 
              src="/lovable-uploads/b64569f8-98df-4df0-87e0-069d5835bbcd.png"
              alt="Costerbox Logo"
              className="h-8"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 mb-4">
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Tote Bags
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              T-Shirts
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Patchwork Tops & Shirts
            </Link>
            <Link to="/diaries" className="hover:text-primary/80 transition-colors">
              Diaries
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Gamcha
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Gifts for Your Beloved
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Create Your Own
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Revived
            </Link>
            <Link to="/clothing" className="hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search Kijiye"
              className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300"
            />
          </div>

          <div className="absolute top-4 right-4 flex items-center space-x-4">
            {userRole ? (
              <>
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border border-gray-200">
                    {userName && (
                      <>
                        <div className="px-2 py-1.5 text-sm font-medium">
                          Hello, {userName}
                        </div>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => navigate(userRole === "admin" ? "/admin/products" : "/profile")}>
                      {userRole === "admin" ? "Admin Dashboard" : "My Profile"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                      My Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border border-gray-200">
                  <DropdownMenuItem onClick={() => navigate("/auth/login")}>
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/auth/signup")}>
                    Sign Up
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/clothing" className="hover:text-primary/80 transition-colors">
                Tote Bags
              </Link>
              <Link to="/clothing" className="hover:text-primary/80 transition-colors">
                T-Shirts
              </Link>
              <Link to="/diaries" className="hover:text-primary/80 transition-colors">
                Diaries
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
