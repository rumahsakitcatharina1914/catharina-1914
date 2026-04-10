'use client';

import { useState, useEffect } from 'react';
import { Newspaper, Plus, Edit, Trash2, X, Upload } from 'lucide-react';

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    thumbnail: '',
    images: [], 
    category: 'umum'
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingNews
        ? `/api/news/${editingNews.id}`
        : '/api/news';
      
      const method = editingNews ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(editingNews ? 'Berita berhasil diupdate!' : 'Berita berhasil ditambahkan!');
        setShowForm(false);
        setEditingNews(null);
        setFormData({ 
          title: '', 
          excerpt: '', 
          content: '', 
          thumbnail: '', 
          images: [], 
          category: 'umum' 
        });
        fetchNews();
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Gagal menyimpan berita');
    }
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      thumbnail: item.thumbnail,
      images: Array.isArray(item.images) ? item.images : [], 
      category: item.category
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Berita berhasil dihapus!');
        fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Gagal menghapus berita');
    }
  };

  //  Upload Thumbnail
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'news');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData(prev => ({ ...prev, thumbnail: url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal upload gambar');
    } finally {
      setUploadingImage(false);
    }
  };


  
  //  Upload Multiple Content Images
  const handleContentImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImage(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('folder', 'news');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload
        });

        if (res.ok) {
          const { url } = await res.json();
          return url;
        }
        return null;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validUrls]
      }));

      alert(`${validUrls.length} gambar berhasil diupload!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Gagal upload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove Content Image
  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Newspaper className="text-primary" size={32} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">Kelola Berita</h1>
            <p className="text-foreground/50 mt-1">Tambah Berita, Artikel, Kegiatan RS Catharina 1914</p>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-border">
          <h2 className="text-xl font-bold mb-6">
            {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Judul Berita *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Masukkan judul berita"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="umum">Umum</option>
                <option value="kesehatan">Kesehatan</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="pengumuman">Pengumuman</option>
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2">Ringkasan *</label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ringkasan singkat berita (ditampilkan di list)"
                rows="3"
              />
            </div>

            {/* Thumbnail */}
            <label className="block text-sm font-semibold mb-2">Upload Thumbnail *</label>
            
            {!formData.thumbnail ? (
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-3 bg-secondary/10 text-secondary border-2 border-dashed border-secondary rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Upload size={20} />
                  <span className="font-semibold">
                    {uploadingImage ? 'Uploading...' : 'Pilih Gambar Thumbnail'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            ) : (
              <div className="relative mt-2 inline-block">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  className="w-full max-w-md h-64 object-cover rounded-xl border border-border shadow-sm"
                />

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, thumbnail: '' })}
                  className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md z-10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}


            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-2">Konten Berita *</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tulis konten berita lengkap di sini..."
                rows="10"
              />
            </div>

            {/* Multiple Content Images */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Gambar Konten (Opsional - Multiple)
              </label>
              <p className="text-sm text-foreground/60 mb-3">
                Upload gambar-gambar yang akan ditampilkan di dalam artikel berita
              </p>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-3 bg-secondary/10 text-secondary border-2 border-dashed border-secondary rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Upload size={20} />
                  <span className="font-semibold">Upload Gambar</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleContentImagesUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                {uploadingImage && (
                  <span className="text-sm text-foreground/60">Uploading...</span>
                )}
              </div>

              {/* Preview Uploaded Images */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Content image ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        //  bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md z-10
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full transition-colors hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                        Gambar {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 font-semibold bg-secondary-light text-black rounded-lg hover:bg-[#c5dbe8] transition-colors transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                disabled={uploadingImage}
              >
                {editingNews ? 'Update Berita' : 'Simpan Berita'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingNews(null);
                  setFormData({ 
                    title: '', 
                    excerpt: '', 
                    content: '', 
                    thumbnail: '', 
                    images: [], 
                    category: 'umum' 
                  });
                }}
                className="px-6 py-3 font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-lg"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table*/}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-neutral-light border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Thumbnail</th>
                <th className="px-30 py-4 text-left text-sm font-semibold text-foreground">Judul</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Gambar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tanggal</th>
                <th className="px-10 py-4 text-left text-sm font-semibold text-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-foreground/50">
                    Belum ada berita. Klik "Tambah Berita" untuk membuat berita baru.
                  </td>
                </tr>
              )}
              {news.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-neutral-light/50">
                  <td className="px-6 py-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-xs sm:text-sm md:text-sm lg:text-sm text-foreground">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground/70">
                      {Array.isArray(item.images) ? item.images.length : 0} gambar
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {new Date(item.publishedAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingNews(null);
            setFormData({ 
              title: '', 
              excerpt: '', 
              content: '', 
              thumbnail: '', 
              images: [], 
              category: 'umum' 
            });
          }}
          className=" mt-5 flex items-center gap-2 px-6 py-3 bg-secondary-light text-black rounded-lg hover:bg-[#c5dbe8] border transition-all duration-200 shadow-lg font-semibold"
        >
          <Plus size={20} />
          Tambah Berita
        </button>
    </div>
  );
}