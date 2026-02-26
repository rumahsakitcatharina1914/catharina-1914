'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Memverifikasi akun admin...');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus(data?.message || 'Login gagal');
        setLoading(false);
        return;
      }

      setStatus('Login berhasil. Mengarahkan ke dashboard admin...');
      router.push('/admin');
      router.refresh();
    } catch {
      setStatus('Terjadi kendala jaringan. Coba lagi.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-light flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border p-8 shadow-xl">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Login Admin</h1>
        <p className="text-foreground/70 text-sm mb-6">
          Masukkan akun Gmail dan password admin yang benar untuk membuka dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email Gmail</label>
            <input
              type="email"
              className="w-full border border-border rounded-lg px-3 py-2"
              placeholder="admin@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full border border-border rounded-lg px-3 py-2"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-bold disabled:opacity-70"
            style={{ backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)' }}
          >
            {loading ? 'Memproses...' : 'Masuk Admin'}
          </button>

          {status && <p className="text-sm text-foreground/70">{status}</p>}
        </form>
      </div>
    </main>
  );
}