import { MapPin, Mail, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import { ContactForm } from "./contact-form"

const contactInfo = [
  { icon: <MapPin className="w-6 h-6" />, title: "Location", value: "Chennai, India" },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: "madhusudan27102005@gmail.com",
    isLink: true,
    href: "mailto:madhusudan27102005@gmail.com",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    value: "+91 9360331266",
    isLink: true,
    href: "tel:+919360331266",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-signature">Contact Me</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="flex items-center gap-6 p-6 bg-card border border-border/50 rounded-2xl group hover:border-primary/50 transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider">{info.title}</h3>
                    <div className="text-lg font-medium">
                      {info.isLink ? (
                        <Link href={info.href} className="hover:text-primary transition-colors">
                          {info.value}
                        </Link>
                      ) : (
                        info.value
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-primary/5 border border-primary/20 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: <Github />, href: "https://github.com/Madhusudan04337" },
                  { icon: <Linkedin />, href: "https://www.linkedin.com/in/madhu-sudan-0006a429a/" },
                  { icon: <Twitter />, href: "#" },
                  { icon: <Instagram />, href: "#" },
                ].map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    className="w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
