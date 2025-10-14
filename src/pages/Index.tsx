import { useState } from "react";
import { Product } from "@/types/product";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.length} />
      
      <main>
        <Hero />
        <Categories />
        
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">Os melhores eletrônicos para você</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 TechStore. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
