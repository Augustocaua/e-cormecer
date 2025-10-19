import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { ChevronLeft } from "lucide-react";

const Carregadores = () => {
  // const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();
  const { addItem } = useCart();

  const filteredProducts = products.filter((p) => p.category === "Carregadores");

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-smooth"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para produtos
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Carregadores</h1>
          <p className="text-muted-foreground">Carregamento rápido e sem fio</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length} produtos encontrados
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Carregadores;