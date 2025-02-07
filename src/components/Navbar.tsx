import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-panel sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-display text-xl">
          ELEGANCE
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-primary/80 transition-colors">
            Home
          </Link>
          <Link to="/clothing" className="hover:text-primary/80 transition-colors">
            Clothing
          </Link>
          <Link to="/diaries" className="hover:text-primary/80 transition-colors">
            Diaries
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t animate-fade-in">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="hover:text-primary/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/clothing"
              className="hover:text-primary/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Clothing
            </Link>
            <Link
              to="/diaries"
              className="hover:text-primary/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Diaries
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};