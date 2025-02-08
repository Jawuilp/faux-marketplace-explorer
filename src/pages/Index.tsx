
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter((product: Product) => product.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t("our_products")}</h1>
      
      {categories && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <div className="product-grid">
        {filteredProducts?.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
