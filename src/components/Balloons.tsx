const COLORS = ["#ff6b9d", "#5b8def", "#ffd166", "#ef476f", "#06aed4", "#c084fc"];

export function Balloons({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => {
        const color = COLORS[i % COLORS.length];
        const left = (i * 97) % 100;
        const size = 40 + ((i * 13) % 40);
        const dur = 12 + ((i * 7) % 14);
        const delay = (i * 1.4) % 16;
        const drift = ((i % 5) - 2) * 30;
        return (
          <div
            key={i}
            className="balloon absolute"
            style={{
              left: `${left}%`,
              bottom: 0,
              animationDuration: `${dur}s`,
              animationDelay: `-${delay}s`,
              ["--drift" as string]: `${drift}px`,
            }}
          >
            <div
              style={{
                width: size,
                height: size * 1.2,
                background: `radial-gradient(circle at 30% 30%, #fff8, ${color})`,
                borderRadius: "50%",
                boxShadow: `0 6px 20px ${color}55`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: `10px solid ${color}`,
                  transform: "translateX(-50%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  width: 1,
                  height: 60,
                  background: "#0003",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Confetti({ count = 30 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const color = COLORS[i % COLORS.length];
        const left = (i * 53) % 100;
        const dur = 4 + ((i * 3) % 6);
        const delay = (i * 0.7) % 8;
        return (
          <div
            key={i}
            className="confetti absolute"
            style={{
              left: `${left}%`,
              top: 0,
              width: 8,
              height: 14,
              background: color,
              animationDuration: `${dur}s`,
              animationDelay: `-${delay}s`,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}
