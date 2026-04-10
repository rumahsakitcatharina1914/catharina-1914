'use client';

import { useEffect, useState } from 'react';
import { Instagram, Plus, Trash2, Upload, X, Image as ImageIcon, Edit } from 'lucide-react';

export default function FeedsPage() {
  const [feeds, setFeeds] = useState([]);
  const [feedForm, setFeedForm] = useState({ title: '', href: '', thumbnail: '' });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadFeeds = async () => {
    const res = await fetch('/api/instagram-feeds');
    if (res.ok) setFeeds(await res.json());
  };

  

  useEffect(() => {
    loadFeeds();
  }, []);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!');
      return;
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB!');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadedImage(data.url);
        setFeedForm({ ...feedForm, thumbnail: data.url });
      } else {
        alert(data.error || 'Upload gagal');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Terjadi kesalahan saat upload');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFeedForm({ ...feedForm, thumbnail: '' });
  };

  const addFeed = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/instagram-feeds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedForm),
      });

      if (res.ok) {
        setFeedForm({ title: '', href: '', thumbnail: '' });
        setUploadedImage(null);
        loadFeeds();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambah feed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const deleteFeed = async (id) => {
  if (!confirm('Yakin ingin menghapus feed ini?')) return;
  await fetch(`/api/instagram-feeds/${id}`, { method: 'DELETE' });
  loadFeeds();
  };

  const updateFeedThumbnail = async (id, thumbnail) => {
  if (!thumbnail || thumbnail.trim() === '') return;
  
  try {
    const res = await fetch(`/api/instagram-feeds/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ thumbnail }),
    });

    if (res.ok) {
      loadFeeds();
      // Optional: show success message
      // alert('Thumbnail berhasil diupdate!');
    }
  } catch (error) {
    console.error('Error updating thumbnail:', error);
  }
};

  return (
    <div className="max-w-5xl mx-auto space-y-8 ">
      <div className="flex items-center gap-3">
        <Instagram className="text-primary" size={32} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Kelola Instagram Feeds</h1>
          <p className="text-foreground/50 mt-1">Tambah dan kelola feed Instagram RS Catharina 1914</p>
        </div>
      </div>

      {/* Form Tambah Feed */}
      <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Plus size={24} className="text-primary" />
          Tambah Feed Baru
        </h2>
        <form onSubmit={addFeed} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Judul Feed</label>
            <input
              className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Contoh: Kegiatan Donor Darah"
              value={feedForm.title}
              onChange={(e) => setFeedForm({ ...feedForm, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">URL Post Instagram</label>
            <input
              className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://www.instagram.com/p/..."
              value={feedForm.href}
              onChange={(e) => setFeedForm({ ...feedForm, href: e.target.value })}
              required
            />
          </div>

          {/* Upload gambar */}
          <div>
            <label className="block text-sm font-semibold mb-2">Thumbnail Gambar *</label>
            
            {!uploadedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="p-4 bg-neutral-light rounded-full">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {uploading ? 'Uploading...' : 'Klik untuk upload gambar'}
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">
                      JPG / PNG(Max 5MB)
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative border border-border rounded-lg p-4 max-w-sm">
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-foreground/70 mt-2 text-center">
                  Gambar berhasil diupload
                </p>
              </div>
            )}
          </div>
                <button
                  type="submit"
                  className="w-full bg-secondary-light text-black rounded-lg px-6 py-3 font-semibold hover:bg-[#c5dbe8] border transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus size={20} />
                  Tambah Feed
                </button>
        </form>
      </div>

      {/* List Feeds */}
      <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group">
        <h2 className="text-xl font-bold mb-4">Daftar Feed ({feeds.length})</h2>
        
        {feeds.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">Belum ada feed. Tambahkan feed pertama!</p>
        ) : (
          <div className="space-y-3">
            {feeds.map((feed) => (
              <div key={feed.id} className="bg-neutral-light rounded-xl p-4">
                <div className="flex gap-4 items-start">
                    {feed.thumbnail && (
                      <img
                        src={feed.thumbnail}
                        alt={feed.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base truncate">{feed.title}</p>

                        <a
                            href={feed.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline truncate block"
                        >
                            {feed.href}
                        </a>
                    </div>
                  <button
                    onClick={() => deleteFeed(feed.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all flex-shrink-0"
                    title="Hapus feed"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}