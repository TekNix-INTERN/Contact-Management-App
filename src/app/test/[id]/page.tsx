//src/app/test/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface ContactPageProps {
  params: {
    id: string;
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const router = useRouter();
  const { id } = params; // lấy `id` từ URL

  useEffect(() => {
    async function fetchContact() {
      const response = await axios.get(`/api/contacts/${id}`);
      setContact(response.data);
      setEditContact(response.data);
    }
    fetchContact();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editContact) {
      await axios.put(`/api/contacts/${id}`, editContact);
      router.push('/');
    }
  };

  const handleDelete = async () => {
    await axios.delete(`/api/contacts/${id}`);
    router.push('/');
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Contact</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editContact?.name || ''}
          onChange={(e) => setEditContact({ ...editContact, name: e.target.value } as Contact)}
        />
        <input
          type="text"
          value={editContact?.phone || ''}
          onChange={(e) => setEditContact({ ...editContact, phone: e.target.value } as Contact)}
        />
        <button type="submit">Update Contact</button>
      </form>
      <button onClick={handleDelete}>Delete Contact</button>
    </div>
  );
}
