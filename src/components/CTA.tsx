import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Ready to <span className="text-primary">Transform</span>
            <br />
            Your Development Journey?
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Join now and enjoy the environment of Codnite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow text-lg px-10 h-14 group animate-glow"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-10 h-14"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSf8ZovgP7JX4jj1Q0nRUAUaFWwLPmkdf8wpav3mqKfLFU6T2Q/viewform?usp=publish-editor', '_blank')}
            >
              Feedback
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
           And Please Don't forget to Uplaod a Post with #Codnite-UnitedByCode.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
