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
    <section className="py-24 px-6 bg-white border-t border-zinc-100 relative overflow-hidden" id="contact">
      {/* Background soft gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium text-zinc-900 inline-block relative border-b-4 border-[#4A32A1] pb-2"
          >
            Contact Me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Location */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex items-center gap-5 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-zinc-100 shadow-sm shrink-0">
                <MapPin className="w-5 h-5 text-[#4A32A1]" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Location</div>
                <div className="text-zinc-900 font-medium text-[15px]">Chennai, India</div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex items-center gap-5 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-zinc-100 shadow-sm shrink-0">
                <Mail className="w-5 h-5 text-[#4A32A1]" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Email</div>
                <div className="text-zinc-900 font-medium text-[15px] truncate">madhusudan27102005@gmail.com</div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex items-center gap-5 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-zinc-100 shadow-sm shrink-0">
                <Phone className="w-5 h-5 text-[#4A32A1]" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Phone</div>
                <div className="text-zinc-900 font-medium text-[15px]">+91 9360331266</div>
              </div>
            </div>

            {/* Connect With Me */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 mt-2 hover:bg-white hover:shadow-md transition-all">
              <div className="text-[15px] font-bold text-zinc-900 mb-4">Connect With Me</div>
              <div className="flex items-center gap-3">
                <a href="https://github.com/Madhusudan04337" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-[#4A32A1] hover:border-[#4A32A1] hover:shadow-sm transition-all relative group">
                   <div className="absolute inset-0 bg-[#4A32A1]/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all z-0" />
                   <Github className="w-4 h-4 relative z-10" />
                </a>
                <a href="https://www.linkedin.com/in/madhu-sudan-0006a429a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-sm transition-all relative group">
                   <div className="absolute inset-0 bg-[#0077b5]/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all z-0" />
                   <Linkedin className="w-4 h-4 relative z-10" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-[28px] border border-zinc-200 shadow-[0_12px_40px_rgb(0,0,0,0.08)] p-8 lg:p-10 relative overflow-hidden"
          >
            <h3 className="text-2xl font-display font-medium text-zinc-900 mb-8">Send Me a Message</h3>
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Name */}
                 <div className="space-y-2">
                   <label className="text-[13px] font-semibold text-zinc-700">Name</label>
                   <div className="relative">
                     <User className="absolute left-3.5 top-3.5 text-zinc-400 w-4 h-4" />
                     <input 
                       name="name"
                       type="text" 
                       required
                       placeholder="Your Name" 
                       className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#4A32A1]/20 focus:border-[#4A32A1] transition-all"
                     />
                   </div>
                 </div>
                 
                 {/* Email */}
                 <div className="space-y-2">
                   <label className="text-[13px] font-semibold text-zinc-700">Email</label>
                   <div className="relative">
                     <Mail className="absolute left-3.5 top-3.5 text-zinc-400 w-4 h-4" />
                     <input 
                       name="email"
                       type="email" 
                       required
                       placeholder="your@email.com" 
                       className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#4A32A1]/20 focus:border-[#4A32A1] transition-all"
                     />
                   </div>
                 </div>
               </div>

               {/* Subject */}
               <div className="space-y-2">
                 <label className="text-[13px] font-semibold text-zinc-700">Subject</label>
                 <div className="relative">
                   <Type className="absolute left-3.5 top-3.5 text-zinc-400 w-4 h-4" />
                   <input 
                     name="subject"
                     type="text" 
                     required
                     placeholder="What is this about?" 
                     className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#4A32A1]/20 focus:border-[#4A32A1] transition-all"
                   />
                 </div>
               </div>

               {/* Message */}
               <div className="space-y-2">
                 <label className="text-[13px] font-semibold text-zinc-700">Message</label>
                 <div className="relative">
                   <MessageSquare className="absolute left-3.5 top-3.5 text-zinc-400 w-4 h-4" />
                   <textarea 
                     name="message"
                     required
                     placeholder="Your message..." 
                     className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#4A32A1]/20 focus:border-[#4A32A1] transition-all min-h-[120px] resize-y"
                   />
                 </div>
               </div>

               {/* Submit Button */}
               <div className="pt-2">
                 <button 
                   type="submit"
                   disabled={isSubmitting}
                   className={`w-full ${status === 'success' ? 'bg-green-600' : status === 'error' ? 'bg-red-600' : 'bg-[#4A32A1] hover:bg-[#3D2887]'} text-white py-4 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2 text-[15px] disabled:opacity-70 disabled:cursor-not-allowed`}
                 >
                   {isSubmitting ? (
                     <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                   ) : status === 'success' ? (
                     <>Sent Successfully! <CheckCircle2 className="w-4 h-4" /></>
                   ) : status === 'error' ? (
                     <>Failed to Send <AlertCircle className="w-4 h-4" /></>
                   ) : (
                     <>Send Message <Send className="w-4 h-4" /></>
                   )}
                 </button>
               </div>
               
               {/* Footer text */}
               <div className="text-center">
                 <p className="text-xs text-zinc-500 font-medium">
                   {status === 'success' ? 'Thanks for reaching out! I\'ll be in touch.' : 'I\'ll get back to you as soon as possible. Usually within 24 hours.'}
                 </p>
               </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
