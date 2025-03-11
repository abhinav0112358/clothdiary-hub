import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Shield, Mail } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For demo purposes, allow specific demo accounts
      if (email === "admin@example.com" && password === "admin") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Admin User");
        
        toast({
          title: "Welcome back, Admin!",
          description: "You've successfully logged in.",
        });
        navigate("/admin/products");
        return;
      }
      
      if (email === "user@example.com" && password === "password") {
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userName", "Demo User");
        
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        navigate("/profile");
        return;
      }
      
      // Try Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user info in localStorage
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userName", user.displayName || user.email?.split('@')[0] || "User");
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate("/profile");
    } catch (error: any) {
      console.error("Login error:", error);
      
      // If Firebase auth fails, check if it's a demo email but wrong password
      if (email === "user@example.com" || email === "admin@example.com") {
        toast({
          title: "Login Failed",
          description: "Incorrect password for demo account. Please try again.",
          variant: "destructive",
        });
      } else {
        // For other users, suggest using the demo accounts
        toast({
          title: "Login Failed",
          description: "Authentication failed. For demo, try user@example.com/password or admin@example.com/admin",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setResetLoading(true);
    try {
      // For demo purposes, just show success for any email
      if (resetEmail.includes("@")) {
        toast({
          title: "Password Reset Email Sent",
          description: "Check your email for a link to reset your password.",
        });
        setResetDialogOpen(false);
        setResetEmail("");
      } else {
        throw new Error("Invalid email");
      }
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
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
                disabled={loading}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="link"
                      className="px-0 text-sm font-medium text-primary"
                    >
                      Forgot password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Reset your password</DialogTitle>
                      <DialogDescription>
                        Enter your email address and we'll send you a link to reset your password.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePasswordReset}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="resetEmail" className="text-right text-sm font-medium col-span-1">
                            Email
                          </label>
                          <Input
                            id="resetEmail"
                            type="email"
                            className="col-span-3"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            disabled={resetLoading}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={resetLoading}>
                          {resetLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/auth/signup")}
              disabled={loading}
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
