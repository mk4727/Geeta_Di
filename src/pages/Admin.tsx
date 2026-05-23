import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMedia } from "@/lib/media-store";
import { Upload, Trash2, Lock, LogOut, Image as ImageIcon, Video } from "lucide-react";

const PASSWORD = "123456789";
const AUTH_KEY = "geeta_admin_auth";

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(
    typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1",
  );

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return (
    <Dashboard
      onLogout={() => {
        sessionStorage.removeItem(AUTH_KEY);
        setAuthed(false);
      }}
    />
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setErr("Wrong password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--gradient-hero)" }}>
      <form onSubmit={submit} className="w-full max-w-sm bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border-2" style={{ borderColor: "var(--blue-soft)" }}>
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: "var(--blue)" }}>
          <Lock className="text-white" size={26} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-center text-foreground/60 text-sm mb-6">Enter password to manage media</p>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(""); }}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--blue-soft)" }}
        />
        {err && <p className="text-sm text-red-500 mt-2">{err}</p>}
        <button type="submit" className="w-full mt-4 px-6 py-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition" style={{ background: "var(--blue)" }}>
          Sign In
        </button>
        <Link to="/" className="block text-center mt-4 text-sm text-foreground/60 hover:underline">← Back to site</Link>
      </form>
    </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { items, addFiles, remove, clear } = useMedia();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setBusy(true);
    try {
      await addFiles(files);
    } catch (e) {
      alert("Upload failed: " + (e as Error).message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen px-6 py-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-foreground/60 mt-1">Upload images and videos that appear on the home page</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="px-4 py-2 rounded-xl border-2 font-medium hover:bg-white/50 transition" style={{ borderColor: "var(--pink)", color: "var(--pink)" }}>View Site</Link>
            <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-white/80 border-2 font-medium flex items-center gap-2 hover:bg-white transition" style={{ borderColor: "var(--blue-soft)" }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          className="rounded-3xl border-2 border-dashed p-12 text-center bg-white/70 backdrop-blur mb-10"
          style={{ borderColor: "var(--blue)" }}
        >
          <Upload className="mx-auto mb-3" size={40} style={{ color: "var(--blue)" }} />
          <h2 className="text-xl font-semibold">Drop files here or click to upload</h2>
          <p className="text-foreground/60 text-sm mt-1">Images (jpg, png, gif) and videos (mp4, webm)</p>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*" onChange={(e) => handleFiles(e.target.files)} className="hidden" />
          <button disabled={busy} onClick={() => inputRef.current?.click()} className="mt-5 px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50 hover:scale-105 transition" style={{ background: "var(--blue)" }}>
            {busy ? "Uploading…" : "Choose files"}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Uploaded ({items.length})</h3>
          {items.length > 0 && (
            <button onClick={() => { if (confirm("Delete all media?")) clear(); }} className="text-sm text-red-500 hover:underline">Clear all</button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">No media yet. Upload some to see them on the home page.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((m) => (
              <div key={m.id} className="relative group rounded-2xl overflow-hidden shadow-lg bg-white">
                {m.type === "image" ? (
                  <img src={m.url} alt={m.name} className="w-full aspect-square object-cover" />
                ) : (
                  <video src={m.url} className="w-full aspect-square object-cover" muted />
                )}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/60 text-white text-xs flex items-center gap-1">
                  {m.type === "image" ? <ImageIcon size={12} /> : <Video size={12} />}
                  {m.type}
                </div>
                <button onClick={() => remove(m.id)} className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition">
                  <Trash2 size={14} />
                </button>
                <p className="text-xs p-2 truncate">{m.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
