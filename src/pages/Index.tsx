import { useState } from "react";
import { Product } from "@/types/product";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

const Index = () => {
  // const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();
  const { addItem } = useCart();

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
      
      <main>
        <Hero />
        <Categories />
        
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">Os melhores eletrônicos para você</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-black mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-white">
          
        <p>© 2025 e-cormecer. Todos os direitos reservados.</p>
        <p> projeto desevolvindo para portifolio </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
