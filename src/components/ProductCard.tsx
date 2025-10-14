import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-large hover:-translate-y-2 animate-fade-in-up">
      <CardHeader className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <span className="text-sm font-semibold text-muted-foreground">Esgotado</span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-accent text-accent animate-pulse" />
          <span className="font-medium">{product.rating}</span>
          <span className="mx-1">•</span>
          <span>{product.category}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg transition-all duration-300 group-hover:text-primary line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="pt-2">
          <span className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-105 inline-block">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="default"
          className="w-full transition-all duration-300 hover:scale-105"
          disabled={!product.inStock}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
