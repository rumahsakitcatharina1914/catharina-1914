'use client';

import { useEffect, useState } from 'react';
import { Stethoscope, Plus, Trash2,  Upload, User, Calendar, Clock, Trash, Edit, X } from 'lucide-react';

const emptyDoctor = {
  name: '',
  specialization: '',
  image: '',
  schedules: [{ day: '', time: '' }],
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const addScheduleField = () => {
    setDoctorForm({
      ...doctorForm,
      schedules: [...doctorForm.schedules, { day: '', time: '' }],
    });
  };

  const updateSchedule = (index, field, value) => {
    const updated = [...doctorForm.schedules];
    updated[index][field] = value;
    setDoctorForm({ ...doctorForm, schedules: updated });
  };

  const removeSchedule = (index) => {
    const updated = doctorForm.schedules.filter((_, i) => i !== index);
    setDoctorForm({ ...doctorForm, schedules: updated });
  };

  const loadDoctors = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB!');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setUploadedImage(data.url);
        setDoctorForm({ ...doctorForm, image: data.url });
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
    setDoctorForm({ ...doctorForm, image: '' });
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setDoctorForm({
      name: doctor.name,
      specialization: doctor.specialization,
      image: doctor.image || '',
      schedules:
        doctor.schedule && doctor.schedule.length > 0
          ? doctor.schedule
          : [{ day: '', time: '' }],
    });
    setUploadedImage(doctor.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingDoctor(null);
    setDoctorForm(emptyDoctor);
    setUploadedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingDoctor ? `/api/doctors/${editingDoctor.id}` : '/api/doctors';
      const method = editingDoctor ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: doctorForm.name,
          specialization: doctorForm.specialization,
          image: doctorForm.image || null,
          schedule: doctorForm.schedules.filter((s) => s.day && s.time),
        }),
      });

      if (res.ok) {
        setDoctorForm(emptyDoctor);
        setUploadedImage(null);
        setEditingDoctor(null);
        loadDoctors();
        alert(editingDoctor ? 'Dokter berhasil diupdate!' : 'Dokter berhasil ditambahkan!');
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan dokter');
      }
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    if (!confirm('Yakin ingin menghapus dokter ini?')) return;
    try {
      const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadDoctors();
        alert('Dokter berhasil dihapus!');
      } else {
        alert('Gagal menghapus dokter');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Terjadi kesalahan');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Stethoscope className="text-primary" size={32} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Kelola Dokter</h1>
          <p className="text-foreground/50 mt-1">Tambah dan kelola data dokter rumah sakit</p>
        </div>
      </div>

      {/* Form Tambah / Edit */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          {editingDoctor ? (
            <>
              <Edit size={24} className="text-primary" />
              Edit Data Dokter
            </>
          ) : (
            <>
              <Plus size={24} className="text-primary" />
              Tambah Dokter Baru
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-semibold mb-2">Foto Dokter</label>
            {!uploadedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="doctor-photo-upload"
                  disabled={uploading}
                />
                <label htmlFor="doctor-photo-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="p-4 bg-neutral-light rounded-full">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {uploading ? 'Uploading...' : 'Klik untuk upload foto dokter'}
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">JPG, PNG (Max 5MB)</p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative border border-border rounded-lg p-4 inline-block">
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <img src={uploadedImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Nama & Spesialisasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Lengkap Dokter *</label>
              <input
                className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Cth: dr. Nama Dokter, Sp."
                value={doctorForm.name}
                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Spesialisasi *</label>
              <input
                className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Cth: Spesialis ..."
                value={doctorForm.specialization}
                onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Jadwal Praktik */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Jadwal Praktik</label>
            {doctorForm.schedules?.map((schedule, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  placeholder="Senin - Rabu"
                  className="w-full sm:w-44 border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={schedule.day}
                  onChange={(e) => updateSchedule(index, 'day', e.target.value)}
                />
                <div className="flex gap-2 flex-1">
                  <div className="relative flex-1">
                    <input
                      placeholder="08:00 - 12:00"
                      className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ paddingRight: index > 0 ? '2.5rem' : '1rem' }}
                      value={schedule.time}
                      onChange={(e) => updateSchedule(index, 'time', e.target.value)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSchedule(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addScheduleField}
              className="text-primary font-semibold text-sm hover:underline"
            >
              + Tambah Jadwal
            </button>
          </div>

          {/* Tombol Submit + Batal */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-secondary-light text-black rounded-lg px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold hover:bg-[#c5dbe8] border transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {editingDoctor ? <Edit size={20} /> : <Plus size={20} />}
              {loading ? 'Menyimpan...' : editingDoctor ? 'Update Dokter' : 'Tambah Dokter'}
            </button>

            {editingDoctor && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 font-semibold shadow-lg"
              >
                <X size={18} />
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Dokter */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Daftar Dokter ({doctors.length})</h2>

        {fetchLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-light border-2 border-gray-300 rounded-xl p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12">
            <User className="mx-auto text-foreground/30 mb-4" size={64} />
            <p className="text-foreground/70 font-semibold mb-1">Belum ada dokter</p>
            <p className="text-sm text-foreground/50">Tambahkan dokter pertama!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`bg-neutral-light border border-border rounded-xl overflow-hidden hover:shadow-md transition-all`}
              >
                {/* Foto + Nama + Tombol */}
                <div className="flex gap-4 p-4">
                  <div className="shrink-0">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-12 h-16 object-cover rounded-lg border-primary"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="text-primary" size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-base truncate">{doctor.name}</h3>
                        <p className="text-primary font-semibold text-sm">{doctor.specialization}</p>
                      </div>

                      {/* Tombol Edit + Hapus */}
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                          title="Edit dokter"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteDoctor(doctor.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                          title="Hapus dokter"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jadwal - full width di bawah */}
                {doctor.schedule && doctor.schedule.length > 0 && (
                  <div className="px-4 pb-4">
                    <div className="p-2 bg-white rounded-lg border border-border w-full">
                      <p className="text-xs font-semibold text-foreground/70 mb-2 flex items-center gap-1">
                        <Calendar size={12} />
                        Jadwal Praktik:
                      </p>
                      <div className="space-y-1">
                        {doctor.schedule.map((sched, idx) => (
                          <div key={idx} className="text-xs flex items-center gap-1">
                            <Clock size={12} className="text-primary shrink-0" />
                            <span className="text-foreground/70 shrink-0">{sched.day}:</span>
                            <span className="font-semibold">{sched.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}