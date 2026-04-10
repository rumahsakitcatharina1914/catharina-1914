'use client';

import { useEffect, useState } from 'react';
import { Mail, Trash2, Phone, AtSign } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const res = await fetch('/api/messages');
    if (res.ok) setMessages(await res.json());
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    loadMessages();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Mail className="text-primary" size={32} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Pesan Masuk</h1>
          <p className="text-foreground/70 mt-1">Kelola pesan dari pengunjung website RS Catharina 1914</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Total Pesan: {messages.length}</h2>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="mx-auto text-foreground/30 mb-4" size={64} />
            <p className="text-foreground/70">Belum ada pesan masuk</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="border border-border rounded-xl p-6 bg-neutral-light hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{msg.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        {msg.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <AtSign size={16} />
                        {msg.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                    title="Hapus pesan"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="bg-white rounded-lg p-4 border border-border">
                  <p className="text-sm font-semibold text-foreground/70 mb-2">Pesan:</p>
                  <p className="text-foreground leading-relaxed">{msg.message}</p>
                </div>

                {msg.createdAt && (
                  <p className="text-xs text-foreground/50 mt-3">
                    Diterima: {new Date(msg.createdAt).toLocaleString('id-ID')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}