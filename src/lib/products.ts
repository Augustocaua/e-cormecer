import { Product } from "@/types/product";
import earbudsImage from "@/assets/product-earbuds.jpg";
import cableImage from "@/assets/product-cable.jpg";
import chargerImage from "@/assets/product-charger.jpg";
import headphonesImage from "@/assets/product-headphones.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Fone Bluetooth Premium",
    description: "Fones de ouvido sem fio com cancelamento de ruído ativo, bateria de 30h e qualidade de som excepcional.",
    price: 299.90,
    image: earbudsImage,
    category: "Audio",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2",
    name: "Cabo USB-C Pro",
    description: "Cabo de carregamento rápido USB-C de 2m, suporta até 100W de potência e transferência de dados ultrarrápida.",
    price: 79.90,
    image: cableImage,
    category: "Acessórios",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "3",
    name: "Carregador Wireless",
    description: "Base de carregamento sem fio com tecnologia de carregamento rápido 15W e design minimalista.",
    price: 149.90,
    image: chargerImage,
    category: "Carregadores",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "4",
    name: "Headset Gamer RGB",
    description: "Headset gamer com som surround 7.1, iluminação RGB personalizável e microfone com cancelamento de ruído.",
    price: 399.90,
    image: headphonesImage,
    category: "Audio",
    rating: 4.9,
    inStock: true,
  },
];

export const categories = [
  { name: "Audio", count: 2 },
  { name: "Acessórios", count: 1 },
  { name: "Carregadores", count: 1 },
];
