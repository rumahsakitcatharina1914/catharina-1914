'use client';

import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        // Redirect ke dashboard (bukan /admin lagi!)
        window.location.href = '/admin/dashboard';
      } else {
        setError(data?.message || 'Login gagal');
        setLoading(false);
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-4 shadow-lg">
            <Lock className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Login Admin</h1>
          <p className="text-foreground/70">Rumah Sakit Catharina 1914</p>
        </div>

        <div className="w-full bg-white rounded-2xl border border-border p-8 shadow-2xl">
          <p className="text-foreground/70 text-sm mb-6 text-center">
            Masukkan akun Gmail dan password admin yang benar untuk membuka dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Gmail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-neutral-light"
                  placeholder="catharina2026@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-11 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-neutral-light"
                  placeholder="••••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{ backgroundImage: 'linear-gradient(to right, #005ba3, #003d7a)' }}
            >
              {loading ? 'Memproses...' : 'Masuk Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary hover:underline font-medium">
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}