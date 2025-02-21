
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-[600px] overflow-hidden bg-gray-100">
      <div className="container relative mx-auto px-4 py-32">
        <div className="max-w-2xl animate-fade-up space-y-6">
          <h1 className="font-display text-6xl sm:text-7xl text-gray-900 leading-tight">
            Exquisite Designs
            <br />
            Coasterbox
          </h1>
          <div className="space-y-2">
            <p className="text-3xl sm:text-4xl font-light">
              up to <span className="text-red-500 font-normal">70%</span> off
            </p>
            <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">
              <p className="text-gray-800 font-medium">
                ENDING IN 2 DAYS
              </p>
            </div>
          </div>
          <div className="pt-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/clothing">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
