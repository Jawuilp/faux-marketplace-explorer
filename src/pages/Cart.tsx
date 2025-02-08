
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: t("order_success"),
      description: t("order_placed_successfully"),
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t("shopping_cart")}</h1>
        <p className="text-gray-500">{t("cart_empty")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("shopping_cart")}</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-4 rounded-lg shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-primary font-bold">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    className="ml-auto"
                    onClick={() => removeItem(item.id)}
                  >
                    {t("remove")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">{t("order_summary")}</h2>
          <div className="flex justify-between mb-4">
            <span>{t("total")}:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={handleCheckout}>
            {t("checkout")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
