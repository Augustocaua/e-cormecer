import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Tecnologia que
              <span className="block text-primary">
                Transforma Vidas
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Descubra os melhores produtos eletrônicos com qualidade premium e preços que cabem no seu bolso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Saiba Mais
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 gradient-hero opacity-20 blur-3xl"></div>
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden">
              <img
                src={heroBanner}
                alt="Produtos Tech Premium"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
