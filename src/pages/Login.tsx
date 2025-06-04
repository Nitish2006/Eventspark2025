
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Admin credentials - hardcoded for quick access
const ADMIN_EMAIL = "eventspark7@gmail.com";
const ADMIN_PASSWORD = "admin123";

const Login = () => {
  const { login, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated and redirect to events page
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      console.log("User already authenticated, redirecting to events page");
      navigate("/events", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Login submission:", values.email);
      await login(values.email, values.password);
      
      // Don't redirect here, let the useEffect handle it
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setIsLoading(true);
    try {
      console.log("Admin quick login");
      await login(ADMIN_EMAIL, ADMIN_PASSWORD);
      toast.success("Admin login successful!");
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error("Admin login failed. Please try again.");
      setIsLoading(false);
    }
  };

  // If we're still checking auth status, show loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-220px)]">
        <Loader2 className="h-8 w-8 animate-spin text-college-primary mr-2" />
        <span>Checking authentication status...</span>
      </div>
    );
  }

  // If user is already authenticated, we don't need to render the form
  // The useEffect will handle the redirect
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-220px)]">
        <Loader2 className="h-8 w-8 animate-spin text-college-primary mr-2" />
        <span>You are already logged in. Redirecting to events page...</span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@college.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-college-primary hover:bg-college-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground mb-4">
              Quick access for testing
            </div>
            <Button 
              variant="outline" 
              className="w-full border-college-primary text-college-primary hover:bg-college-primary/10"
              onClick={handleAdminLogin}
              disabled={isLoading}
            >
              <Shield className="mr-2 h-4 w-4" />
              {isLoading ? "Logging in..." : "Login as Admin"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm text-muted-foreground w-full">
            <p>Don't have an account?{" "}
              <Link to="/register" className="text-college-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
