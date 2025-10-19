import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "@/types/product";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { items: cartItems, setQuantity, removeItem, subtotal } = useCart();

  // removed local updateQuantity and removeItem; using context methods

  // Replace local subtotal with context subtotal
  const shipping = subtotal > 200 ? 0 : 29.90;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent className="space-y-4">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground">
                  Adicione produtos para continuar comprando
                </p>
              </div>
              <Link to="/products">
                <Button variant="default" size="lg">
                  Ver Produtos
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover bg-muted"
                      />
                      <div className="flex-1 space-y-2">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold hover:text-primary transition-smooth">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.category}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal < 200 && (
                      <p className="text-xs text-muted-foreground">
                        Falta R$ {(200 - subtotal).toFixed(2)} para frete grátis!
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    Finalizar Compra
                  </Button>

                  <Link to="/products">
                    <Button variant="outline" size="lg" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
