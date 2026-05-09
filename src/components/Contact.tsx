import { useState, useRef } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Github, Linkedin, Send, User, Type, MessageSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(form.current);
    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Send Auto-Reply
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-20 px-6 bg-[#FAFAFA] relative overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] opacity-40" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Column: Creative Header & Info */}
          <div className="lg:w-5/12 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[#4A32A1] text-[10px] md:text-xs font-bold uppercase tracking-widest"
              >
                <div className="w-2 h-2 rounded-full bg-[#4A32A1] animate-pulse" />
                Available for projects
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-display font-bold text-zinc-900 leading-tight"
              >
                Let's build <br />
                <span className="text-[#4A32A1]">something </span>
                great.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-zinc-600 text-base max-w-md leading-relaxed"
              >
                Have a vision? I have the tools. Reach out and let's turn your ideas into high-fidelity digital reality.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Location", value: "Chennai, India" },
                { icon: Mail, label: "Email", value: "madhusudan27102005@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 9360331266" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group flex items-center gap-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm group-hover:border-[#4A32A1]/30 group-hover:shadow-md transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#4A32A1]" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-zinc-900 font-semibold text-sm md:text-base">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-zinc-200"
            >
              <p className="text-[10px] md:text-xs font-bold text-zinc-900 mb-4 uppercase tracking-widest">Connect Socially</p>
              <div className="flex gap-4">
                <a href="https://github.com/Madhusudan04337" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#4A32A1] hover:text-white hover:border-[#4A32A1] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/madhu-sudan-0006a429a/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-7/12 w-full relative"
          >
            {/* Decorative Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#4A32A1]/20 to-orange-100/30 rounded-[32px] blur-xl opacity-50" />

            <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl p-6 md:p-10">
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-display font-bold text-zinc-900">Send Me a Message</h3>
                <div className="h-1.5 w-10 bg-[#4A32A1] rounded-full mt-3" />
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="group relative">
                    <label className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest absolute -top-2.5 left-4 bg-white px-2 z-10 transition-colors group-focus-within:text-[#4A32A1]">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#4A32A1] transition-colors" />
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-transparent border-2 border-zinc-100 rounded-2xl pl-12 pr-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-[#4A32A1]/40 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group relative">
                    <label className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest absolute -top-2.5 left-4 bg-white px-2 z-10 transition-colors group-focus-within:text-[#4A32A1]">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#4A32A1] transition-colors" />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full bg-transparent border-2 border-zinc-100 rounded-2xl pl-12 pr-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-[#4A32A1]/40 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="group relative">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest absolute -top-2.5 left-4 bg-white px-2 z-10 transition-colors group-focus-within:text-[#4A32A1]">Subject</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#4A32A1] transition-colors" />
                    <input
                      name="subject"
                      type="text"
                      required
                      placeholder="Collaboration inquiry"
                      className="w-full bg-transparent border-2 border-zinc-100 rounded-2xl pl-12 pr-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-[#4A32A1]/40 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="group relative">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest absolute -top-2.5 left-4 bg-white px-2 z-10 transition-colors group-focus-within:text-[#4A32A1]">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-zinc-400 group-focus-within:text-[#4A32A1] transition-colors" />
                    <textarea
                      name="message"
                      required
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent border-2 border-zinc-100 rounded-2xl pl-12 pr-4 py-4 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-[#4A32A1]/40 focus:bg-white transition-all duration-300 min-h-[140px] resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full group relative overflow-hidden py-3.5 rounded-[20px] font-bold text-sm transition-all duration-500 shadow-xl active:scale-[0.98]
                    ${status === 'success' ? 'bg-green-600' : status === 'error' ? 'bg-red-600' : 'bg-zinc-900 hover:bg-[#4A32A1]'} text-white`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                    ) : status === 'success' ? (
                      <>Message Dispatched <CheckCircle2 className="w-5 h-5" /></>
                    ) : status === 'error' ? (
                      <>Submission Failed <AlertCircle className="w-5 h-5" /></>
                    ) : (
                      <>Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </div>
                </button>

                <p className="text-center text-xs text-zinc-400 font-medium tracking-wide">
                  I usually respond within 24 business hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
