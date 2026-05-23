import { NavLink } from "react-router-dom";
import { Heart, Image, Mail } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Heart },
  { to: "/memories", label: "Memories", icon: Image },
  { to: "/message", label: "Message", icon: Mail },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-lg gradient-text">Happy Birthday Geeta Didi 🎉</span>
        <div className="flex gap-1 sm:gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition ${
                  isActive ? "text-white shadow-md" : "text-foreground/70 hover:bg-white/60"
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: "var(--blue)" } : undefined
              }
            >
              <l.icon size={15} />
              <span className="hidden sm:inline">{l.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
