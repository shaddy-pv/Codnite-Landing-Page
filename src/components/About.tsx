import { Target, Heart, Rocket } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center space-y-6 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="text-primary">Codnite</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Codnite was born from a simple belief: developers are stronger together. We're building 
              a platform where collaboration isn't just encouraged—it's effortless. Whether you're 
              a beginner taking your first steps or a seasoned pro crafting the next big thing, 
              Codnite is your home for innovation.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground">
                Empowering developers worldwide to build, learn, and innovate without boundaries.
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Our Values</h3>
              <p className="text-muted-foreground">
                Community, collaboration, and continuous growth are at the heart of everything we do.
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground">
                A future where every developer has access to world-class tools and global collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
