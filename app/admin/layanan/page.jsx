'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Upload, SmilePlus, Image as ImageIcon, Trash2 } from 'lucide-react';

const emptyLayanan = {
  num: '', title: '', short: '', description: '',
  features: [''], schedule: '', image: '', color: '#0077b6', bg: '#e0f2fe', order: 0,
};

const emptyFasilitas = {
  label: '', description: '', image: '', isLarge: false, isWide: false, order: 0,
};

export default function AdminLayananPage() {
  const [tab, setTab] = useState('layanan'); // 'layanan' | 'fasilitas'

  // Layanan State
  const [layananList, setLayananList] = useState([]);
  const [layananForm, setLayananForm] = useState(emptyLayanan);
  const [editingLayanan, setEditingLayanan] = useState(null);
  const [showLayananForm, setShowLayananForm] = useState(false);

  // Fasilitas State
  const [fasilitasList, setFasilitasList] = useState([]);
  const [fasilitasForm, setFasilitasForm] = useState(emptyFasilitas);
  const [editingFasilitas, setEditingFasilitas] = useState(null);
  const [showFasilitasForm, setShowFasilitasForm] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLayanan();
    fetchFasilitas();
  }, []);

  // Fetch
  const fetchLayanan = async () => {
    const res = await fetch('/api/layanan');
    if (res.ok) setLayananList(await res.json());
  };

  const fetchFasilitas = async () => {
    const res = await fetch('/api/fasilitas');
    if (res.ok) setFasilitasList(await res.json());
  };

  // Upload gambar
  const handleUpload = async (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) setter(data.url);
    } catch { alert('Upload gagal'); }
    finally { setUploading(false); }
  };

  // Layanan Handlers
  const handleLayananSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingLayanan ? `/api/layanan/${editingLayanan.id}` : '/api/layanan';
      const method = editingLayanan ? 'PUT' : 'POST';
      const features = layananForm.features.filter(f => f.trim() !== '');
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...layananForm, features }),
      });
      if (res.ok) {
        fetchLayanan();
        setLayananForm(emptyLayanan);
        setEditingLayanan(null);
        setShowLayananForm(false);
        alert(editingLayanan ? 'Layanan diupdate!' : 'Layanan ditambahkan!');
      }
    } catch { alert('Gagal menyimpan'); }
    finally { setLoading(false); }
  };

  const handleEditLayanan = (item) => {
    setEditingLayanan(item);
    setLayananForm({
      num: item.num, title: item.title, short: item.short,
      description: item.description, features: Array.isArray(item.features) ? item.features : [''],
      schedule: item.schedule || '', image: item.image || '',
      color: item.color, bg: item.bg, order: item.order,
    });
    setShowLayananForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteLayanan = async (id) => {
    if (!confirm('Hapus layanan ini?')) return;
    await fetch(`/api/layanan/${id}`, { method: 'DELETE' });
    fetchLayanan();
  };

  //Fasilitas Handlers
  const handleFasilitasSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingFasilitas ? `/api/fasilitas/${editingFasilitas.id}` : '/api/fasilitas';
      const method = editingFasilitas ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fasilitasForm),
      });
      if (res.ok) {
        fetchFasilitas();
        setFasilitasForm(emptyFasilitas);
        setEditingFasilitas(null);
        setShowFasilitasForm(false);
        alert(editingFasilitas ? 'Fasilitas diupdate!' : 'Fasilitas ditambahkan!');
      }
    } catch { alert('Gagal menyimpan'); }
    finally { setLoading(false); }
  };

  const handleEditFasilitas = (item) => {
    setEditingFasilitas(item);
    setFasilitasForm({
      label: item.label, description: item.description || '',
      image: item.image || '', isLarge: item.isLarge, isWide: item.isWide, order: item.order,
    });
    setShowFasilitasForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteFasilitas = async (id) => {
    if (!confirm('Hapus fasilitas ini?')) return;
    await fetch(`/api/fasilitas/${id}`, { method: 'DELETE' });
    fetchFasilitas();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <div className="flex items-center gap-3">
        <SmilePlus className="text-primary" size={32} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Kelola Layanan & Fasilitas</h1>
          <p className="text-foreground/60 mt-1">Tambah dan kelola layanan serta fasilitas RS Catharina 1914</p>
        </div>
      </div>

      {/* Tab */}
      <div className="flex gap-2 border-b border-border">
        {['layanan', 'fasilitas'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-3 sm:py-3 font-bold text-sm sm:text-base md:text-lg lg:text-xl capitalize transition-all border-b-2 -mb-px ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-foreground/50 hover:text-foreground'
            }`}>
            {t === 'layanan' ? 'Layanan' : 'Fasilitas'}
          </button>
        ))}
      </div>
      

     

      {/*Tab Layanan */}
      {tab === 'layanan' && (
        <>
          {/* Form Layanan */}
          {showLayananForm && (
            <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                {editingLayanan ? <Edit size={22} className="text-primary" /> : <Plus size={22} className="text-primary" />}
                {editingLayanan ? 'Edit Layanan' : 'Tambah Layanan Baru'}
              </h2>
              <form onSubmit={handleLayananSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nomor (mis: 01)</label>
                    <input className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                      value={layananForm.num} onChange={e => setLayananForm({ ...layananForm, num: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Urutan Tampil</label>
                    <input type="number" className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                      value={layananForm.order} onChange={e => setLayananForm({ ...layananForm, order: parseInt(e.target.value) })} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Judul Layanan *</label>
                  <input className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Rawat Jalan" value={layananForm.title}
                    onChange={e => setLayananForm({ ...layananForm, title: e.target.value })} required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subtitle Singkat *</label>
                  <input className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Konsultasi & Pemeriksaan" value={layananForm.short}
                    onChange={e => setLayananForm({ ...layananForm, short: e.target.value })} required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Deskripsi *</label>
                  <textarea rows={4} className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Deskripsi lengkap layanan..."
                    value={layananForm.description}
                    onChange={e => setLayananForm({ ...layananForm, description: e.target.value })} required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Fitur / Layanan Tersedia</label>
                  {layananForm.features.map((f, i) => (
                    <div key={i} className="relative mb-2">
                      <input className="w-full border border-border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder={`Fitur ${i + 1}`} value={f}
                        onChange={e => {
                          const updated = [...layananForm.features];
                          updated[i] = e.target.value;
                          setLayananForm({ ...layananForm, features: updated });
                        }} />
                      {i > 0 && (
                        <button type="button" onClick={() => setLayananForm({ ...layananForm, features: layananForm.features.filter((_, idx) => idx !== i) })}
                          className=" absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => setLayananForm({ ...layananForm, features: [...layananForm.features, ''] })}
                    className="text-primary font-semibold text-sm hover:underline">+ Tambah Fitur</button>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Jadwal Operasional</label>
                  <input className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Senin – Minggu, 07.00 – 18.00 WIB"
                    value={layananForm.schedule}
                    onChange={e => setLayananForm({ ...layananForm, schedule: e.target.value })} />
                </div>

                {/* Upload Gambar */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Gambar Layanan</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-3 bg-secondary/10 text-secondary border-2 border-dashed border-border hover:border-primary rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors">
                      <Upload size={14} />
                      <span className="font-semibold text-sm">{uploading ? 'Uploading...' : 'Upload Gambar'}</span>
                      <input type="file" accept="image/*" className="hidden" disabled={uploading}
                        onChange={e => handleUpload(e, url => setLayananForm({ ...layananForm, image: url }))} />
                    </label>
                    {layananForm.image && (
                      <div className="relative">
                        <img src={layananForm.image} className="w-16 h-16 object-cover rounded-lg" />
                        <button type="button" onClick={() => setLayananForm({ ...layananForm, image: '' })}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full">
                          <Trash2 size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-secondary-light text-black rounded-lg px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold hover:bg-[#c5dbe8] border transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {editingLayanan ? <Edit size={18} /> : <Plus size={18} />}
                    {loading ? 'Menyimpan...' : editingLayanan ? 'Update Layanan' : 'Simpan Layanan'}
                  </button>
                  <button type="button" onClick={() => { setShowLayananForm(false); setEditingLayanan(null); setLayananForm(emptyLayanan); }}
                    className="px-3 py-2 sm:text-base  bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List Layanan */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Daftar Layanan ({layananList.length})</h2>
            </div>

            {layananList.length === 0 ? (
              <p className="text-center py-12 text-foreground/50">Belum ada layanan. Tambahkan layanan pertama!</p>
            ) : (
              <div className="space-y-3">
                {layananList.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-neutral-light items-center">
                    {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: item.color }}>{item.num}</span>
                        <p className="font-bold text-foreground truncate">{item.title}</p>
                      </div>
                      <p className="text-sm text-foreground/60 truncate">{item.short}</p>
                      {item.schedule && <p className="text-xs text-foreground/40 mt-0.5">{item.schedule}</p>}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => handleEditLayanan(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteLayanan(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/*Tab Fasilitas*/}
      {tab === 'fasilitas' && (
        <>
          {/* Form Fasilitas */}
          {showFasilitasForm && (
            <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                {editingFasilitas ? <Edit size={22} className="text-primary" /> : <Plus size={22} className="text-primary" />}
                {editingFasilitas ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
              </h2>
              <form onSubmit={handleFasilitasSubmit} className="space-y-4">

                <div>
                  <label className="block text-sm font-semibold mb-2">Nama Fasilitas *</label>
                  <input className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Ruang Operasi" value={fasilitasForm.label}
                    onChange={e => setFasilitasForm({ ...fasilitasForm, label: e.target.value })} required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Deskripsi Fasilitas</label>
                  <textarea rows={5} className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Ceritakan tentang fasilitas ini secara lengkap..."
                    value={fasilitasForm.description}
                    onChange={e => setFasilitasForm({ ...fasilitasForm, description: e.target.value })} />
                </div>

                {/* Upload Gambar */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Gambar Fasilitas</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-3 bg-secondary/10 text-secondary border-2 border-dashed border-border hover:border-primary rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors">
                      <Upload size={14} />
                      <span className="font-semibold text-sm">{uploading ? 'Uploading...' : 'Upload Gambar'}</span>
                      <input type="file" accept="image/*" className="hidden" disabled={uploading}
                        onChange={e => handleUpload(e, url => setFasilitasForm({ ...fasilitasForm, image: url }))} />
                    </label>
                    {fasilitasForm.image && (
                      <div className="relative">
                        <img src={fasilitasForm.image} className="w-16 h-16 object-cover rounded-lg" />
                        <button type="button" onClick={() => setFasilitasForm({ ...fasilitasForm, image: '' })}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full">
                          <Trash2 size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Urutan Tampil</label>
                    <input type="number" className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                      value={fasilitasForm.order}
                      onChange={e => setFasilitasForm({ ...fasilitasForm, order: parseInt(e.target.value) })} />
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={fasilitasForm.isLarge}
                        onChange={e => setFasilitasForm({ ...fasilitasForm, isLarge: e.target.checked })}
                        className="w-4 h-4 accent-primary" />
                      <span className="text-sm font-semibold">Tampil Besar (2x2)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={fasilitasForm.isWide}
                        onChange={e => setFasilitasForm({ ...fasilitasForm, isWide: e.target.checked })}
                        className="w-4 h-4 accent-primary" />
                      <span className="text-sm font-semibold">Tampil Lebar (2x1)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-secondary-light text-black rounded-lg px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold hover:bg-[#c5dbe8] border transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {editingFasilitas ? <Edit size={18} /> : <Plus size={18} />}
                    {loading ? 'Menyimpan...' : editingFasilitas ? 'Update Fasilitas' : 'Simpan Fasilitas'}
                  </button>
                  <button type="button" onClick={() => { setShowFasilitasForm(false); setEditingFasilitas(null); setFasilitasForm(emptyFasilitas); }}
                    className="px-3 py-2 sm:text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List Fasilitas */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Daftar Fasilitas ({fasilitasList.length})</h2>
            </div>

            {fasilitasList.length === 0 ? (
              <p className="text-center py-12 text-foreground/50">Belum ada fasilitas. Tambahkan fasilitas pertama!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fasilitasList.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-border bg-neutral-light items-start">
                    {item.image && <img src={item.image} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-sm truncate">{item.label}</p>
                      {item.description && <p className="text-xs text-foreground/60 line-clamp-2 mt-0.5">{item.description}</p>}
                      <div className="flex gap-2 mt-1">
                        {item.isLarge && <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-bold">Besar</span>}
                        {item.isWide && <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-bold">Lebar</span>}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => handleEditFasilitas(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteFasilitas(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}


      {/* Button tambah layanan & fasilitas */}
       {tab === 'layanan' && (
        <button
          onClick={() => { setShowLayananForm(true); setEditingLayanan(null); setLayananForm(emptyLayanan); }}
          className="flex items-center gap-2 px-6 py-3 bg-secondary-light text-black rounded-lg hover:bg-[#c5dbe8] border transition-all duration-200 shadow-lg font-semibold"
        >
          <Plus size={20} />
          Tambah Layanan
        </button>
      )}

      {tab === 'fasilitas' && (
        <button
          onClick={() => { setShowFasilitasForm(true); setEditingFasilitas(null); setFasilitasForm(emptyFasilitas); }}
          className="flex items-center gap-2 px-6 py-3 bg-secondary-light text-black rounded-lg hover:bg-[#c5dbe8] border transition-all duration-200 shadow-lg font-semibold"
        >
          <Plus size={20} />
          Tambah Fasilitas
        </button>
      )}
    </div>
  );
}
