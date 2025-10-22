import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import codniteLogo from "@/assets/codinte-logo-2-removebg-preview (1).png";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Documentation", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press Kit"],
    Resources: ["Community", "Tutorials", "Support", "API"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center space-x-2 group">
              <img 
                src={codniteLogo} 
                alt="Codnite Logo" 
                className="h-8 w-8 transition-transform group-hover:rotate-12" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                Codnite
              </span>
            </a>
            <p className="text-muted-foreground max-w-xs">
              Empowering developers worldwide to collaborate, innovate, and build the future together.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-secondary hover:bg-primary/10 rounded-lg transition-all hover:scale-110"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Codnite. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Codnite- United By Code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
