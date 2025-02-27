
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
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const MenuItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => (
    <Button
      variant="ghost"
      className="w-full justify-between px-4 py-6 h-auto text-base font-normal hover:bg-accent/50"
      onClick={() => navigate(path)}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <span>{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Hey! {userName}</h1>
          <p className="text-sm text-primary-foreground/80">
            Explore Costerbox Premium
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-6 justify-start gap-3"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-6 w-6 text-primary" />
            <span className="text-base">{item.label}</span>
          </Button>
        ))}
      </div>

      <div className="px-4 py-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold px-4 mb-2">Credit Options</h2>
          <div className="space-y-1">
            {creditOptions.map((option, index) => (
              <MenuItem
                key={index}
                icon={option.icon}
                label={option.title}
                path={option.path}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold px-4 mb-2">Account Settings</h2>
          <div className="space-y-1">
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

        <div className="px-4">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
