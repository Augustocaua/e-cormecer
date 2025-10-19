import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

const Smartphones = () => {
  // const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();
  const { addItem } = useCart();

  const filteredProducts = products.filter((p) => p.category === "Smartphones");

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
          <h1 className="text-3xl font-bold">Smartphones</h1>
          <p className="text-muted-foreground">Celulares e dispositivos móveis</p>
        </div>

        {/* Carrosséis por marca (iPhone, Samsung, Xiaomi) */}
        <section className="space-y-6 mb-10">
          <h2 className="text-2xl font-semibold">Marcas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BrandCarousel title="iPhone" images={iphoneImages} />
            <BrandCarousel title="Samsung" images={samsungImages} />
            <BrandCarousel title="Xiaomi" images={xiaomiImages} />
          </div>
        </section>

        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length} produtos encontrados
        </p>

        {filteredProducts.length === 0 ? (
          <p className="text-muted-foreground">Nenhum produto cadastrado nesta categoria ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                imageAspect="4/3"
                imageFit="contain"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Smartphones;


// Marcas e imagens (servidas via /public)
const iphoneImages = [
  "/iphone/iphone-1-convertido-de-jpg.jpeg",
  "/iphone/iphone-2-convertido-de-jpg.jpeg",
];
const samsungImages = [
  "/sansung/samsung-1-convertido-de-jpg.jpeg",
  "/sansung/samsung-3-convertido-de-jpg.jpeg",
];
const xiaomiImages = [
  "/xiome/xiaomi-2-convertido-de-jpg.jpeg",
];

// Componente simples de carrossel por marca
function BrandCarousel({ title, images }: { title: string; images: string[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((src, idx) => (
              <CarouselItem key={`${title}-${idx}`}>
                <div className="relative w-full aspect-[4/3] bg-muted rounded-md border">
                  <img
                    src={src}
                    alt={`${title} ${idx + 1}`}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Imagem anterior" />
          <CarouselNext aria-label="Próxima imagem" />
        </Carousel>
      </CardContent>
    </Card>
  );
}