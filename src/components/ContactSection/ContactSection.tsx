import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, MapPin, ArrowRight } from "lucide-react";
import { Button } from "../lightswind/button";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "abirha3896@gmail.com",
    href: "mailto:abirha3896@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1701-554707",
    href: "tel:+8801701554707",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "infinityabirhasan",
    href: "https://linkedin.com/in/infinityabirhasan",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/InfinityAbir",
    href: "https://github.com/InfinityAbir",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Uttara, Dhaka, Bangladesh",
    href: null,
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">

          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground">
                Reach out for collaborations, opportunities, or just a conversation about backend,
                full-stack, or blockchain engineering.
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-0.5">{item.label}</span>
                      <span className="font-medium text-foreground break-all">{item.value}</span>
                    </div>
                  </>
                );
                const classes = "flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group";
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className={classes}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className={classes}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Card */}
          <div className="flex-1 relative">
            <div className="glass-panel p-8 md:p-10 rounded-[2rem] border border-foreground/10 h-full flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

              <span className="mx-auto px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 mb-6 w-max">
                ● OPEN TO OPPORTUNITIES
              </span>

              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Let's build something <span className="text-gradient-primary">production-grade</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                Recently completed my software engineering internship at Millennium Information
                Solution while finishing my BCSE at IUBAT.
                Looking for a full-time Software Engineer role — backend, full-stack, or blockchain —
                to keep shipping production-grade systems. Let's talk.
              </p>

              <a href="mailto:abirha3896@gmail.com" className="mx-auto">
                <Button size="lg" className="rounded-full px-8 h-12 bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1">
                  Send Message <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};