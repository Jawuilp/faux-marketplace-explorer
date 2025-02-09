
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, title, price, image, category }: ProductCardProps) => {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="block">
        <div className="relative">
          <img src={image} alt={title} className="product-image" />
          <Link 
            to={`/seller/${id}`} 
            className="absolute bottom-2 left-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar className="border-2 border-white hover:border-primary transition-colors">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-2">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-xl font-bold text-primary">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
