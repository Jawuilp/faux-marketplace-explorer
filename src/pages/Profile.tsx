
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCog, Image as ImageIcon, Plus } from "lucide-react";

const Profile = () => {
  const { t } = useLanguage();

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="flex items-start gap-6 flex-col md:flex-row">
        <div className="w-full md:w-1/3 space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
              <AvatarFallback>
                <UserCog className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full gap-2">
              <ImageIcon className="w-4 h-4" />
              {t("change_photo")}
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("profile_info")}</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("name")}</label>
              <Input defaultValue="Usuario Ejemplo" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="usuario@ejemplo.com" type="email" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("bio")}</label>
              <Textarea defaultValue="¡Hola! Me encanta vender ropa de segunda mano." />
            </div>

            <Button>{t("save_changes")}</Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t("my_products")}</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("add_product")}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-gray-500">{t("no_products")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
