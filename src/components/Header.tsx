import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSanitizedInput } from "@/hooks/useSanitizedInput";
import { sanitizeForSearch, isValidSearchQuery, clampLength } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  cartCount?: number;
}

const Header = ({ cartCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { toast } = useToast();
  const search = useSanitizedInput({ sanitize: (v) => clampLength(sanitizeForSearch(v), 100), validate: isValidSearchQuery });
  const { count } = useCart();
  const displayCount = cartCount ?? count;

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!search.isValid) {
        toast({ title: "Busca inválida", description: "Revise seu termo de busca.", variant: "destructive" });
        return;
      }
      // Aqui poderíamos navegar ou acionar uma busca; por ora apenas valida.
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold transition-colors group-hover:text-primary">e-cormecer</span>
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
            <img src="/logo.svg" alt="Buscar" className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10 bg-muted/50 transition-all duration-300 focus:bg-background focus:ring-2 focus:ring-primary"
              value={search.value}
              onChange={search.onChange}
              onPaste={search.onPaste}
              onKeyDown={handleSearchEnter}
              aria-invalid={!search.isValid}
              maxLength={100}
              inputMode="search"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:scale-110">
              <ShoppingCart className="h-5 w-5" />
              {displayCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-scale-in">
                  {displayCount}
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
              <img src="/logo.svg" alt="Buscar" className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 bg-muted/50"
                value={search.value}
                onChange={search.onChange}
                onPaste={search.onPaste}
                onKeyDown={handleSearchEnter}
                aria-invalid={!search.isValid}
                maxLength={100}
                inputMode="search"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
