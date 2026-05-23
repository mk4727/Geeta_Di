
-- Allow anyone to insert/delete media_items (SPA-only mode)
CREATE POLICY "Anyone can insert media items"
ON public.media_items FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can delete media items"
ON public.media_items FOR DELETE TO anon, authenticated USING (true);

-- Storage policies for the 'media' bucket
CREATE POLICY "Anyone can upload to media bucket"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can delete from media bucket"
ON storage.objects FOR DELETE TO anon, authenticated
USING (bucket_id = 'media');

CREATE POLICY "Anyone can read media bucket"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'media');
