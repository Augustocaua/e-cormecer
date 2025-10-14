import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  cartCount?: number;
}

const Header = ({ cartCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="gradient-hero h-8 w-8 rounded-lg transition-transform group-hover:rotate-12"></div>
            <span className="text-xl font-bold transition-colors group-hover:text-primary">TechStore</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105">
              Início
            </Link>
            <Link to="/products" className="text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105">
              Produtos
            </Link>
            <Link to="/categories" className="text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105">
              Categorias
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10 bg-muted/50 transition-all duration-300 focus:bg-background focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:scale-110">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden transition-all duration-300 hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium transition-all duration-300 hover:text-primary hover:translate-x-1">
              Início
            </Link>
            <Link to="/products" className="text-sm font-medium transition-all duration-300 hover:text-primary hover:translate-x-1">
              Produtos
            </Link>
            <Link to="/categories" className="text-sm font-medium transition-all duration-300 hover:text-primary hover:translate-x-1">
              Categorias
            </Link>
            <div className="relative pt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
