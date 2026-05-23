import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Sparkles, Cake, Gift, Star, Music, Settings } from "lucide-react";
import { Balloons, Confetti } from "@/components/Balloons";
import Nav from "@/components/Nav";
import heroImg from "@/assets/birthday-hero.jpg";

const titles = [
  { icon: Heart, label: "My Motivator", emoji: "❤️" },
  { icon: Gift, label: "My Bank Account", emoji: "💸" },
  { icon: Star, label: "My ATM Card", emoji: "🏦" },
  { icon: Sparkles, label: "My Support System", emoji: "🌸" },
  { icon: Cake, label: "My Best Friend", emoji: "👭" },
  { icon: Music, label: "My Happiness", emoji: "😊" },
]; 

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--gradient-hero)" }}>
      <Nav />
      <Balloons />

      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 z-10">
        <Confetti />
        <div className="relative max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="font-semibold tracking-widest uppercase text-sm mb-4" style={{ color: "var(--blue)" }}>
              ✨ A surprise just for you ✨
            </p>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="gradient-text">Happy Birthday</span>
              <br />
              <span className="wobble inline-block" style={{ color: "var(--blue)" }}>Geeta Didi 🎉</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-lg">
              To the woman who is my sister, my hero, and my forever cheerleader — today the whole universe sparkles for you.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link to="/memories" className="px-7 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition" style={{ background: "var(--blue)", boxShadow: "var(--shadow-soft)" }}>
                Open Your Surprise 🎁
              </Link>
              <Link to="/message" className="px-7 py-3 rounded-full font-semibold border-2 hover:scale-105 transition" style={{ borderColor: "var(--pink)", color: "var(--pink)" }}>
                Read My Letter 💌
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
            <div className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-60" style={{ background: "var(--gradient-text)" }} />
            <img src={heroImg} alt="Birthday celebration" width={1536} height={1024} className="relative rounded-[2rem] shadow-2xl shimmer w-full h-auto" />
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl gradient-text mb-4">
            You Are My Everything
          </motion.h2>
          <p className="text-foreground/60 mb-14 text-lg">All the things you mean to me, in no particular order 💕</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {titles.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, rotate: -1 }} className="rounded-3xl p-8 backdrop-blur-sm border-2 shadow-lg" style={{ background: "rgba(255,255,255,0.7)", borderColor: i % 2 ? "var(--pink-soft)" : "var(--blue-soft)" }}>
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: i % 2 ? "var(--pink)" : "var(--blue)" }}>
                  <t.icon className="text-white" size={28} />
                </div>
                <h3 className="text-3xl mb-1">{t.label}</h3>
                <p className="text-2xl">{t.emoji}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 z-10 text-center">
        <p className="text-foreground/50">Made with 💖 just for you, Geeta Didi</p>
        <Link to="/admin" className="inline-flex items-center gap-1 mt-3 text-xs text-foreground/40 hover:text-foreground/70 transition">
          <Settings size={12} /> Admin
        </Link>
      </section>
    </main>
  );
}
