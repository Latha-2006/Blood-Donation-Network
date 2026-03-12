import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";
import heroImage from "@/assets/hero-blood-donation.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
      <div className="relative z-10 text-center text-white p-6 max-w-3xl">
        <Droplet className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" />
        <h1 className="text-5xl md:text-6xl font-bold mb-4">LifeLink</h1>
        <p className="text-2xl md:text-3xl mb-6 font-light">
          Blood Donation Network
        </p>
        <p className="text-xl mb-12 opacity-90">
          Obtaining the correct blood group at the correct time
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/login")}
          className="text-lg px-8 py-6"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
