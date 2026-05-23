import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Sparkles, X } from "lucide-react";
import { Balloons } from "@/components/Balloons";
import Nav from "@/components/Nav";

const messages = [
  "Meri choti mummy I always miss you love you please pleasejaldi se ek choti geeta dedo🥹",
  "Thank you for always being there for me Geeta Didi ❤️",
  "You light up every room you walk into — today the world celebrates you 🌟",
  "From silly fights to endless laughs — every memory with you is a treasure 💖",
  "May your year be as beautiful, kind and unstoppable as you are 🎂",
];

const letter = `My dearest Geeta Didi,

Teri jagh na koi le saka hai na koi le paayega .. kyuki tu 
dost nhi bhen hai meri voh bhen jisne mujhe pyaar se
 rehna pyaar krna sikhaya or jab koi galt bole toh usko 1
  nhi 1000 sunao or kabhi khudko kamjor mt smjho 
  humesha mujhe ladna or apne liye stand lena sikhaya
   mere supne jiske liye khudke supne jese the or mere se
    jyada meri chinta krna ... Tujhe teri life mai jitni pyaar ki
     kami thi I hope and always pray to mahadev ki tujhe
      itna ashirwad de ki kabhi koi kami na rhe ... by the way
       yaad toh uski aati h jisko bhulte h pr tune jo nibhaya h
        voh dosti nhi rishta h agla janam hum dono ko ek hi
         ghar mile .. always with you ❤️
With all my love 💖`;

export default function Message() {
  const [openMsg, setOpenMsg] = useState(false);
  const [openLetter, setOpenLetter] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--gradient-hero)" }}>
      <Nav />
      <Balloons />

      <section className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-6xl text-center gradient-text mb-4">
            A Message From My Heart 💌
          </motion.h2>
          <p className="text-center text-foreground/60 mb-12 text-lg">Tap the card to reveal your surprise</p>

          {/* Hidden main message */}
          {/* <motion.button
            onClick={() => setOpenMsg(true)}
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-3xl p-10 shadow-2xl border-2 backdrop-blur-sm relative overflow-hidden text-left"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))", borderColor: "var(--pink)" }}
          >
            <Mail className="absolute -top-6 -right-6 opacity-10" size={160} style={{ color: "var(--pink)" }} />
            <Sparkles className="mb-3" style={{ color: "var(--pink)" }} size={28} />
            <h3 className="text-3xl font-bold mb-2">A Special Message For You</h3>
            <p className="text-foreground/60">Click to open the surprise ✨</p>
          </motion.button> */}

          {/* Letter From My Heart card */}
          <motion.button
            onClick={() => setOpenLetter(true)}
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 w-full rounded-3xl p-10 shadow-2xl border-2 backdrop-blur-sm relative overflow-hidden text-left"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))", borderColor: "var(--blue)" }}
          >
            <Heart className="absolute -top-6 -right-6 opacity-10" size={160} style={{ color: "var(--blue)" }} />
            <Heart className="mb-3" style={{ color: "var(--blue)" }} size={28} />
            <h3 className="text-3xl font-bold mb-2">A Letter From My Heart</h3>
            <p className="text-foreground/60">Click to read 💌</p>
          </motion.button>

          <div className="mt-16 space-y-6">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl p-6 shadow-xl border-l-8 backdrop-blur-sm relative" style={{ background: "rgba(255,255,255,0.85)", borderColor: i % 2 ? "var(--blue)" : "var(--pink)" }}>
                <Heart className="absolute -top-3 -right-3 text-white p-2 rounded-full" size={32} style={{ background: i % 2 ? "var(--blue)" : "var(--pink)" }} />
                <p className="text-lg md:text-xl leading-relaxed text-foreground/80">{m}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PopupCard open={openMsg} onClose={() => setOpenMsg(false)} title="Happy Birthday Geeta Didi 🎉" accent="var(--pink)">
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
          {`On this special day I just want you to know — you are the most amazing sister anyone could ask for. ❤️\n\nEvery laugh, every fight, every late-night talk — I treasure them all. Thank you for being my home.\n\nMay your day be filled with cake, joy, and all the love in the world. 🎂✨`}
        </p>
      </PopupCard>

      <PopupCard open={openLetter} onClose={() => setOpenLetter(false)} title="A Letter From My Heart 💌" accent="var(--blue)">
        <p className="text-lg leading-relaxed whitespace-pre-line italic text-foreground/80">{letter}</p>
      </PopupCard>
    </main>
  );
}

function PopupCard({ open, onClose, title, accent, children }: { open: boolean; onClose: () => void; title: string; accent: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 max-h-[85vh] overflow-y-auto"
            style={{ borderColor: accent,textAlign: "center" }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 transition">
              <X size={20} />
            </button>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
