"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { useState } from "react";
import { useSendStatus } from "@/hooks/useSendStatus";

const inputClass = `
  w-full px-4 py-3 rounded-lg border 
  bg-white/70 dark:bg-zinc-800/40 
  backdrop-blur-sm transition-all 
  focus:outline-none focus:ring-2 focus:ring-pink-500
  text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500
`;

const ContactFormTerminal = () => {
  const { t } = useLanguage();
  const { status, send } = useSendStatus();

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(async () => {
      await new Promise((res) => setTimeout(res, 1500));
      setForm({ name: "", email: "", message: "" });
    });
  };

  return (
    <motion.div
      className="relative bg-white/10 dark:bg-zinc-900/30 backdrop-blur-xl border border-zinc-300/30 dark:border-zinc-700/40 rounded-2xl p-8 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background aura */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/20 blur-3xl rounded-full -z-10" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
          >
            {t("contact.form.name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={inputClass}
            placeholder={t("contact.form.name.placeholder")}
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
          >
            {t("contact.form.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            placeholder={t("contact.form.email.placeholder")}
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
          >
            {t("contact.form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={inputClass}
            placeholder={t("contact.form.message.placeholder")}
            required
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <motion.button
          type="submit"
          className={`w-full px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60`}
          whileTap={{ scale: 0.97 }}
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <motion.span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {status === "sending"
            ? t("contact.form.submitting")
            : t("contact.form.submit")}
        </motion.button>

        {status === "sent" && (
          <motion.div
            className="mt-4 text-green-600 dark:text-green-400 text-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("contact.form.success")}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactFormTerminal;
