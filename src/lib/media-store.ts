import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  name: string;
  createdAt: string;
};

const BUCKET = "media";
const EVT = "geeta-media-updated";

function publicUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

async function fetchAll(): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from("media_items")
    .select("id,type,path,name,created_at")
    .order("created_at", { ascending: true });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map((r) => ({
    id: r.id,
    type: r.type as "image" | "video",
    name: r.name,
    createdAt: r.created_at,
    url: publicUrl(r.path),
  }));
}

export function useMedia() {
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      const next = await fetchAll();
      if (!cancelled) setItems(next);
    };
    refresh();
    const handler = () => refresh();
    window.addEventListener(EVT, handler);
    return () => {
      cancelled = true;
      window.removeEventListener(EVT, handler);
    };
  }, []);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isVideo && !isImage) continue;
      const type: "image" | "video" = isVideo ? "video" : "image";
      const ext = file.name.split(".").pop() || "bin";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw new Error(upErr.message);

      const { error: insErr } = await supabase
        .from("media_items")
        .insert({ type, path, name: file.name });
      if (insErr) throw new Error(insErr.message);
    }
    window.dispatchEvent(new Event(EVT));
  }, []);

  const remove = useCallback(async (id: string) => {
    const { data: row } = await supabase
      .from("media_items")
      .select("path")
      .eq("id", id)
      .single();
    if (row?.path) await supabase.storage.from(BUCKET).remove([row.path]);
    await supabase.from("media_items").delete().eq("id", id);
    window.dispatchEvent(new Event(EVT));
  }, []);

  const clear = useCallback(async () => {
    const { data: rows } = await supabase.from("media_items").select("id,path");
    const paths = (rows ?? []).map((r) => r.path).filter(Boolean);
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    if (rows?.length) {
      await supabase
        .from("media_items")
        .delete()
        .in(
          "id",
          rows.map((r) => r.id),
        );
    }
    window.dispatchEvent(new Event(EVT));
  }, []);

  return { items, addFiles, remove, clear };
}
