
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock authentication - in a real app, you'd validate against a backend
    if (email === "admin@example.com" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      toast({
        title: "Welcome back, Admin!",
        description: "You've successfully logged in.",
      });
      navigate("/admin/products");
    } else if (email && password) {
      localStorage.setItem("userRole", "user");
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="font-display text-3xl">Welcome Back</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/auth/signup")}
            >
              Create Account
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Admin demo: </span>
              <span className="flex items-center justify-center gap-1 mt-1">
                <Shield className="h-4 w-4" />
                admin@example.com / admin
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
