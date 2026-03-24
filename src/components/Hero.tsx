import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import StatsSection from "./StatsSection";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Tech background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>United By Code</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build The Future
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-orange-500 bg-clip-text text-transparent">
              Together
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Join a global community of developers collaborating to create innovative solutions and shape tomorrow's technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow text-lg px-8 h-14 group"
              onClick={() => window.open('https://codnite.vercel.app/', '_blank')}
            >
              Start Building
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 h-14"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSf8ZovgP7JX4jj1Q0nRUAUaFWwLPmkdf8wpav3mqKfLFU6T2Q/viewform?usp=publish-editor', '_blank')}
            >
              Feedback
            </Button>
          </div>

          {/* Stats */}
          <StatsSection />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
