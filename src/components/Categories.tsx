import { Headphones, Cable, Battery, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Audio", icon: Headphones, color: "from-blue-500 to-cyan-500" },
  { name: "Acessórios", icon: Cable, color: "from-purple-500 to-pink-500" },
  { name: "Carregadores", icon: Battery, color: "from-orange-500 to-red-500" },
  { name: "Smartphones", icon: Smartphone, color: "from-green-500 to-emerald-500" },
];

const Categories = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold mb-2">Categorias em Destaque</h2>
        <p className="text-muted-foreground">Encontre o que você procura</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.name}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg transition-colors group-hover:text-primary">{category.name}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
