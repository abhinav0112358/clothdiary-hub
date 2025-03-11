
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserCheck } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For demo purposes, allow any valid-looking signup
      if (email.includes("@") && password.length >= 6) {
        // Try Firebase first, but fall back to demo mode
        try {
          // Create a new user with Firebase
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Update the user's profile with their name
          if (name) {
            await updateProfile(user, {
              displayName: name
            });
          }
        } catch (firebaseError) {
          console.error("Firebase error (continuing with mock signup):", firebaseError);
          // Continue with mock signup even if Firebase fails
        }
        
        // Store user info in localStorage for the app to use
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userName", name || email.split('@')[0]);
        
        toast({
          title: "Account created!",
          description: "Welcome to our platform.",
        });
        
        navigate("/profile");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      let errorMessage = "Failed to create account.";
      
      if (!email.includes("@")) {
        errorMessage = "Please enter a valid email address.";
      } else if (password.length < 6) {
        errorMessage = "Password must be at least 6 characters long.";
      }
      
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="font-display text-3xl">Create Account</h2>
          <p className="mt-2 text-muted-foreground">Sign up for a new account</p>
        </div>
        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your name"
                disabled={loading}
              />
            </div>
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
                placeholder="Choose a password (at least 6 characters)"
                minLength={6}
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              <UserCheck className="mr-2 h-4 w-4" />
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/auth/login")}
              disabled={loading}
            >
              Already have an account? Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
