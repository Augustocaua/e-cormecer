import { useState } from "react";
import { Product } from "@/types/product";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SlidersHorizontal } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Products = () => {
  // const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const { toast } = useToast();
  const { addItem } = useCart();

  const categories = ["Todos", "Audio", "Acessórios", "Carregadores"];

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todos os Produtos</h1>
          <p className="text-muted-foreground">Explore nossa coleção completa</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Filtros</h3>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-3">Categorias</p>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} produtos encontrados
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
