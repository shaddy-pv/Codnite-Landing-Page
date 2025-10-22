import { Code, Users, Zap, Shield, Trophy, MessageSquare } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Solve Problems",
      description: "Interactive coding challenges with real-time feedback, automated testing, and instant results. Practice algorithms and data structures with our comprehensive problem library.",
    },
    {
      icon: Users,
      title: "College Community",
      description: "Connect with classmates and developers from your college. Build study groups, share knowledge, and grow together in a supportive coding environment.",
    },
    {
      icon: Zap,
      title: "Interactive Learning",
      description: "Real-time code editor with syntax highlighting, live debugging, and instant feedback. Learn through hands-on practice with guided tutorials and challenges.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Messaging",
      description: "Direct messages and group chats to connect with fellow developers. Share code snippets, ask questions, and collaborate on projects instantly.",
    },
    {
      icon: Trophy,
      title: "Point System",
      description: "Earn points for activities - 5 for login, 50-150 for challenges. Level up through 10+ levels, unlock achievement badges, and climb leaderboards.",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your code, messages, and data are protected with enterprise-grade security. Secure communication and reliable infrastructure ensure your work is always safe.",
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-primary">Codnite</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to collaborate, innovate, and succeed as a developer
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative space-y-4">
                {/* Icon */}
                <div className="inline-flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
