
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
      <div className="container relative mx-auto px-4 py-32">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">
            Discover Timeless Elegance
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Curated collection of premium clothing and artisanal diaries for the
            discerning individual.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link to="/clothing">Shop Clothing</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/diaries">View Diaries</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
