'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const emptyDoctor = {
  name: '',
  specialization: '',
  experience: '',
  education: '',
  day: '',
  time: '',
};

export default function AdminPage() {
  const router = useRouter();
  const [feeds, setFeeds] = useState([]);
  const [messages, setMessages] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [feedForm, setFeedForm] = useState({ title: '', href: '', thumbnail: '' });
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);

  const loadAll = async () => {
    const [feedRes, msgRes, docRes] = await Promise.all([
      fetch('/api/instagram-feeds'),
      fetch('/api/messages'),
      fetch('/api/doctors'),
    ]);

    if (feedRes.ok) setFeeds(await feedRes.json());
    if (msgRes.ok) setMessages(await msgRes.json());
    if (docRes.ok) setDoctors(await docRes.json());
  };

  useEffect(() => {
    loadAll();
  }, []);

  const addFeed = async (e) => {
    e.preventDefault();
    await fetch('/api/instagram-feeds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedForm),
    });
    setFeedForm({ title: '', href: '', thumbnail: '' });
    loadAll();
  };

  const deleteFeed = async (id) => {
    await fetch(`/api/instagram-feeds/${id}`, { method: 'DELETE' });
    loadAll();
  };

  const updateFeedThumbnail = async (id, thumbnail) => {
    await fetch(`/api/instagram-feeds/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ thumbnail }),
    });
    loadAll();
  };

  const deleteMessage = async (id) => {
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    loadAll();
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    await fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: doctorForm.name,
        specialization: doctorForm.specialization,
        experience: Number(doctorForm.experience || 0),
        education: doctorForm.education,
        schedule: doctorForm.day && doctorForm.time ? [{ day: doctorForm.day, time: doctorForm.time }] : [],
      }),
    });
    setDoctorForm(emptyDoctor);
    loadAll();
  };

  const deleteDoctor = async (id) => {
    await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    loadAll();
  };

  const logoutAdmin = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-neutral-light p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-serif font-bold text-foreground">Dashboard Admin</h1>
          <button onClick={logoutAdmin} className="px-4 py-2 rounded-lg border border-border bg-white text-foreground font-semibold hover:bg-neutral-light">
            Logout
          </button>
        </div>

        <section className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-2xl font-bold">Kelola Feed Instagram</h2>
          <form onSubmit={addFeed} className="grid sm:grid-cols-4 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="Judul" value={feedForm.title} onChange={(e) => setFeedForm({ ...feedForm, title: e.target.value })} required />
            <input className="border rounded-lg px-3 py-2" placeholder="URL Post Instagram" value={feedForm.href} onChange={(e) => setFeedForm({ ...feedForm, href: e.target.value })} required />
            <input className="border rounded-lg px-3 py-2" placeholder="URL Thumbnail" value={feedForm.thumbnail} onChange={(e) => setFeedForm({ ...feedForm, thumbnail: e.target.value })} required />
            <button className="bg-primary text-white rounded-lg px-4 py-2 font-semibold">Tambah Feed</button>
          </form>
          <div className="space-y-2">
            {feeds.map((feed) => (
              <div key={feed.id} className="bg-neutral-light rounded-lg p-3 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="font-semibold">{feed.title}</p>
                    <p className="text-sm text-foreground/70">{feed.href}</p>
                  </div>
                  <button onClick={() => deleteFeed(feed.id)} className="text-red-600 font-semibold">Hapus</button>
                </div>

                <div className="flex gap-2">
                  <input
                    className="border rounded-lg px-3 py-2 w-full text-sm"
                    defaultValue={feed.thumbnail || ''}
                    onBlur={(e) => updateFeedThumbnail(feed.id, e.target.value)}
                    placeholder="URL Thumbnail"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-2xl font-bold">Pesan Masuk</h2>
          <div className="space-y-3">
            {messages.length === 0 && <p className="text-foreground/70">Belum ada pesan masuk.</p>}
            {messages.map((msg) => (
              <div key={msg.id} className="border rounded-xl p-4 bg-neutral-light">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold">{msg.name} - {msg.phone}</p>
                    <p className="text-sm text-foreground/70">{msg.email}</p>
                    <p className="mt-2">{msg.message}</p>
                  </div>
                  <button onClick={() => deleteMessage(msg.id)} className="text-red-600 font-semibold">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-2xl font-bold">Input Dokter Tersedia</h2>
          <form onSubmit={addDoctor} className="grid sm:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="Nama dokter" value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} required />
            <input className="border rounded-lg px-3 py-2" placeholder="Spesialisasi" value={doctorForm.specialization} onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })} required />
            <input type="number" className="border rounded-lg px-3 py-2" placeholder="Pengalaman (tahun)" value={doctorForm.experience} onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Pendidikan" value={doctorForm.education} onChange={(e) => setDoctorForm({ ...doctorForm, education: e.target.value })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Hari praktik" value={doctorForm.day} onChange={(e) => setDoctorForm({ ...doctorForm, day: e.target.value })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Jam praktik" value={doctorForm.time} onChange={(e) => setDoctorForm({ ...doctorForm, time: e.target.value })} />
            <button className="sm:col-span-2 bg-primary text-white rounded-lg px-4 py-2 font-semibold">Tambah Dokter</button>
          </form>

          <div className="space-y-2">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex justify-between items-center bg-neutral-light rounded-lg p-3">
                <div>
                  <p className="font-semibold">{doctor.name} - {doctor.specialization}</p>
                  <p className="text-sm text-foreground/70">{doctor.experience} tahun pengalaman</p>
                </div>
                <button onClick={() => deleteDoctor(doctor.id)} className="text-red-600 font-semibold">Hapus</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}