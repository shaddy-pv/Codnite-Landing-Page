import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arjun S.",
      role: "Computer Science Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      content: "Codnite changed the way I approach coding. The real-time challenges and community support made me consistent for the first time ever.",
      rating: 5, 
    },
    {
      name: "Priya M.",
      role: "Competitive Programmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      content: "The battle mode is addictive in the best way. Competing with peers from my college pushed me to solve problems I would've given up on before.",
      rating: 5,
    },
    {
      name: "Rohit K.",
      role: "Software Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
      content: "Finally a platform that feels like it was built by developers, for developers. The college community feature is a game changer for collaboration.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden bg-[#0A0A0A]">
      {/* Section top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.03)_0%,transparent_60%)] blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Loved By{' '}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFB340)',
            }}>Coders</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            See what our community has to say about learning and growing with Codnite.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="bg-[#0F0F0F] border border-white/[0.04] rounded-2xl p-8 space-y-6 hover:border-[#FF6A00]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(255,106,0,0.1)] group"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FF6A00] text-[#FF6A00]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.04]">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-[#1a1a1a] border border-white/[0.06] flex-shrink-0">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
