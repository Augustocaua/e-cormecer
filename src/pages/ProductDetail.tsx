import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, ChevronLeft, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  // const [cart, setCart] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Link to="/products">
            <Button variant="default">Voltar para produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Produto adicionado!",
      description: `${quantity}x ${product.name} adicionado ao carrinho.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-smooth">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para produtos
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/30 shadow-large">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} (128 avaliações)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base leading-relaxed text-foreground">
                {product.description}
              </p>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Características:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Garantia de 12 meses</li>
                  <li>Frete grátis para todo o Brasil</li>
                  <li>Entrega em até 7 dias úteis</li>
                  <li>Devolução gratuita em até 30 dias</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
              <Button variant="default" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {!product.inStock && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm font-medium text-destructive">
                  Produto temporariamente indisponível
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
