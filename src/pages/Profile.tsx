
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  ShoppingBag, 
  Heart, 
  Gift, 
  HeadphonesIcon, 
  CreditCard, 
  User, 
  Wallet, 
  MapPin, 
  Languages, 
  Bell,
  ChevronRight,
  ArrowLeft,
  BadgePercent,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    if (!userRole) {
      navigate("/auth/login");
    }
  }, [userRole, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  const menuItems = [
    { icon: ShoppingBag, label: "Orders", path: "/orders" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
    { icon: Gift, label: "Coupons", path: "/coupons" },
    { icon: HeadphonesIcon, label: "Help Center", path: "/help" },
  ];

  const creditOptions = [
    {
      title: "Instant Cash",
      description: "Instant Approval | Fast Disbursal",
      icon: CreditCard,
      path: "/instant-cash"
    },
    {
      title: "Costerbox EMI",
      description: "Get 10% Instant Discount Upto Rs.500*",
      icon: Wallet,
      path: "/emi"
    }
  ];

  const accountSettings = [
    { icon: User, label: "Edit Profile", path: "/profile/edit" },
    { icon: Wallet, label: "Saved Cards & Wallet", path: "/profile/payment" },
    { icon: MapPin, label: "Saved Addresses", path: "/profile/addresses" },
    { icon: Languages, label: "Select Language", path: "/profile/language" },
    { icon: Bell, label: "Notification Settings", path: "/profile/notifications" }
  ];

  const MenuItem = ({ icon: Icon, label, path, description }: { icon: any; label: string; path: string; description?: string }) => (
    <Button
      variant="ghost"
      className="w-full justify-between px-6 py-6 h-auto text-base font-normal hover:bg-accent/50 rounded-xl transition-all group overflow-hidden relative"
      onClick={() => navigate(path)}
    >
      <div className="flex items-center gap-4 z-10">
        <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-left">
          <span className="font-medium">{label}</span>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground p-6 flex items-center gap-4 shadow-md">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-primary-foreground/10">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Hey! {userName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 px-2">
              <Award className="w-3 h-3 mr-1" /> Premium Member
            </Badge>
            <p className="text-sm text-primary-foreground/80">
              200 points
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-6 justify-start gap-4 rounded-xl border-2 hover:border-primary/50 hover:shadow-md transition-all"
              onClick={() => navigate(item.path)}
            >
              <div className="bg-primary/10 p-3 rounded-lg">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-base font-medium">{item.label}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          <section className="bg-card rounded-2xl shadow-sm border p-4">
            <h2 className="text-lg font-semibold px-2 mb-4 flex items-center">
              <BadgePercent className="h-5 w-5 mr-2 text-primary" />
              Credit Options
            </h2>
            <div className="space-y-2">
              {creditOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  icon={option.icon}
                  label={option.title}
                  description={option.description}
                  path={option.path}
                />
              ))}
            </div>
          </section>

          <section className="bg-card rounded-2xl shadow-sm border p-4">
            <h2 className="text-lg font-semibold px-2 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Account Settings
            </h2>
            <div className="space-y-2">
              {accountSettings.map((setting, index) => (
                <MenuItem
                  key={index}
                  icon={setting.icon}
                  label={setting.label}
                  path={setting.path}
                />
              ))}
            </div>
          </section>

          <div className="px-2 mt-10">
            <Button 
              variant="destructive" 
              className="w-full rounded-xl py-6 shadow-sm hover:shadow-md transition-all"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
