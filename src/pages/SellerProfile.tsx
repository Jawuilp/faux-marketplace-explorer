
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const SellerProfile = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    },
  });

  // Filtramos los productos para mostrar solo los del vendedor actual
  // Por ahora, como es una API de ejemplo, simulamos que cada producto
  // con ID múltiplo del ID del vendedor le pertenece
  const sellerProducts = products?.filter((product: Product) => 
    product.id % Number(id) === 0
  ) || [];

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Vendedor #{id}</h1>
          <p className="text-gray-500">Se unió en Enero 2024</p>
          <p className="mt-2">¡Hola! Me encanta vender ropa de segunda mano y encontrar nuevos hogares para prendas especiales.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("seller_products")}</h2>
        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerProducts.map((product: Product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Este vendedor aún no tiene productos.</p>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;
