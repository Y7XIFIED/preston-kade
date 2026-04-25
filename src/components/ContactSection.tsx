import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Copy, Check } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@prestonkade.dev", copyable: true },
  { icon: MapPin, label: "Location", value: "Chicago, IL", copyable: false },
  { icon: Phone, label: "Phone", value: "+1 (312) 555-0147", copyable: true },
];

const CopyableInfo = ({ info }: { info: typeof contactInfo[0] }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!info.copyable) return;
    await navigator.clipboard.writeText(info.value);
    setCopied(true);
    toast({ title: "Copied!", description: `${info.value} copied to clipboard.` });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-center gap-4 ${info.copyable ? "cursor-pointer group" : ""}`}
      onClick={handleCopy}
    >
      <div className="w-12 h-12 rounded-xl border border-stroke/30 bg-surface/50 backdrop-blur-sm flex items-center justify-center group-hover:border-white/10 transition-all duration-300">
        <info.icon className="w-5 h-5 text-muted" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted uppercase tracking-wider">{info.label}</p>
        <p className="text-sm text-text">{info.value}</p>
      </div>
      {info.copyable && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-muted opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </div>
      )}
    </div>
  );
};

const ContactSection = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field: keyof ContactForm) =>
    `w-full bg-transparent border-b ${errors[field] ? "border-red-400/50" : "border-stroke/50 focus:border-text/30"} py-3 text-sm text-text placeholder:text-muted/50 outline-none transition-colors`;

  return (
    <section id="contact" className="py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-text mb-16">
            Start a conversation
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <input type="text" placeholder="Your name" value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass("name")} maxLength={100} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" placeholder="Your email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass("email")} maxLength={255} />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => updateField("subject", e.target.value)} className={inputClass("subject")} maxLength={200} />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <textarea placeholder="Tell me about your project..." value={form.message} onChange={(e) => updateField("message", e.target.value)} className={`${inputClass("message")} resize-none h-32`} maxLength={2000} />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-text text-bg text-sm hover:opacity-90 transition-opacity"
              >
                {submitted ? "Sent!" : "Send message"} <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <p className="text-muted leading-relaxed">
                I welcome inquiries regarding new projects, strategic partnerships, and consulting engagements. 
                Please provide a brief overview of your requirements and I will respond promptly.
              </p>

              <div className="space-y-6 mt-12">
                {contactInfo.map((info) => (
                  <CopyableInfo key={info.label} info={info} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
