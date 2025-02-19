
import { Link } from "react-router-dom";
import { ShoppingCart, User, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");

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
              Gameha
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
                <Link to={userRole === "admin" ? "/admin/products" : "/profile"}>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
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
