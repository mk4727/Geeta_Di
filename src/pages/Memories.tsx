import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, X, Download } from "lucide-react";
import { Balloons } from "@/components/Balloons";
import Nav from "@/components/Nav";
import { useMedia, type MediaItem } from "@/lib/media-store";

export default function Memories() {
  const { items: media } = useMedia();
  const [active, setActive] = useState<MediaItem | null>(null);

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--gradient-hero)" }}>
      <Nav />
      <Balloons />

      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-6xl text-center gradient-text mb-4">
            Our Memories 📸
          </motion.h2>
          <p className="text-center text-foreground/60 mb-14 text-lg">Frozen moments, forever us — click any to enlarge</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {media.length === 0 && Array.from({ length: 6 }).map((_, i) => (
              <div key={`ph-${i}`} className="aspect-square rounded-3xl border-4 border-white shadow-xl flex items-center justify-center text-white text-center p-6 font-semibold" style={{ background: i % 3 === 0 ? "linear-gradient(135deg, var(--pink), var(--coral))" : i % 3 === 1 ? "linear-gradient(135deg, var(--blue), oklch(0.7 0.18 240))" : "linear-gradient(135deg, var(--gold), var(--coral))" }}>
                <div>
                  <Cake className="mx-auto mb-3" size={36} />
                  <p className="text-lg">Memory #{i + 1}</p>
                  <p className="text-xs opacity-80 mt-1">Upload from /admin</p>
                </div>
              </div>
            ))}
            {media.map((m, i) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => setActive(m)}
                className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white p-2 cursor-pointer"
              >
                {m.type === "image" ? (
                  <img src={m.url} alt={m.name} className="w-full h-full object-contain rounded-2xl bg-black/5" />
                ) : (
                  <video src={m.url} className="w-full h-full object-contain rounded-2xl bg-black/5" muted playsInline />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center gap-3"
            >
              <button onClick={() => setActive(null)} className="absolute -top-2 -right-2 sm:top-2 sm:right-2 z-10 p-2 rounded-full bg-white text-black shadow-lg hover:scale-110 transition">
                <X size={20} />
              </button>
              {active.type === "image" ? (
                <img src={active.url} alt={active.name} className="max-h-[80vh] w-auto rounded-2xl border-4 border-white shadow-2xl" />
              ) : (
                <video src={active.url} controls autoPlay className="max-h-[80vh] w-auto rounded-2xl border-4 border-white shadow-2xl bg-black" />
              )}
              {active.type === "video" && (
                <a
                  href={active.url}
                  download={active.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition"
                  style={{ background: "var(--blue)" }}
                >
                  <Download size={16} /> Download video
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
