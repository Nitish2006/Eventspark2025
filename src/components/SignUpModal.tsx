
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { register } = useAuth();

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    
    if (!firstName) errors.firstName = "First name is required";
    
    if (!lastName) errors.lastName = "Last name is required";
    
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setValidationErrors({});
    
    try {
      await register(email, password, firstName, lastName);
      toast.success("Registration successful!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#F9FAFB] border-[#1E3A8A] sm:max-w-[425px] dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-[#1E3A8A] text-2xl font-bold dark:text-white">Sign Up</DialogTitle>
          <DialogDescription className="text-[#4B5563] dark:text-gray-300">
            Create your account to join Vignan's Event Spark community
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName" className="text-[#4B5563] dark:text-gray-300">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`border ${validationErrors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-600 dark:bg-gray-700"}`}
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-xs">{validationErrors.firstName}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="lastName" className="text-[#4B5563] dark:text-gray-300">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`border ${validationErrors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-600 dark:bg-gray-700"}`}
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-xs">{validationErrors.lastName}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#4B5563] dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border ${validationErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600 dark:bg-gray-700"}`}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs">{validationErrors.email}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-[#4B5563] dark:text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border ${validationErrors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600 dark:bg-gray-700"}`}
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs">{validationErrors.password}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-[#4B5563] dark:text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`border ${validationErrors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600 dark:bg-gray-700"}`}
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs">{validationErrors.confirmPassword}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Sign Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
