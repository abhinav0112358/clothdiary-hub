
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, User, Mail, Phone, MapPin, UserCog, FileText, ShoppingBag, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName") || "User"; // Fallback to "User" if no name is set

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

  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-muted-foreground">Hello,</p>
                  <h2 className="font-semibold text-lg">{userName}</h2>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/orders")}>
                  <ShoppingBag className="mr-2" />
                  My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/wishlist")}>
                  <Heart className="mr-2" />
                  My Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/profile/settings")}>
                  <UserCog className="mr-2" />
                  Account Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h1 className="font-semibold text-xl">Personal Information</h1>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>user@example.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <UserCog className="h-4 w-4 text-muted-foreground" />
                        <span>Role: <Badge variant="secondary" className="ml-1">{userRole}</Badge></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Member since: Jan 2024</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Default Shipping Address</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <p className="text-sm">
                      123 Main Street<br />
                      Apt 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
