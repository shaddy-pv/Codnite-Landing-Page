import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Chutki",
      role: "Computer Science Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      content: "Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite.",
      rating: 5, 
    },
    {
      name: "Kalia",
      role: "Competitive Programmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      content: "Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite.",
      rating: 5,
    },
    {
      name: "Indumati",
      role: "Software Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        content: "Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite, Codnite.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Loved By <span className="text-primary">Coders</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our community has to say about learning and growing with Codnite
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card border border-border rounded-2xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300 hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
