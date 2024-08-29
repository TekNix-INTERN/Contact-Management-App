'use client'; // Đánh dấu component này là Client Component

import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/contact.css'; // Đảm bảo đường dẫn CSS chính xác

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({ name: '', phone: '' });

  // useEffect để fetch danh sách liên lạc từ API khi trang được tải
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get('/api/contact');
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    fetchContacts();
  }, []);

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/contact', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: '', phone: '' }); // Reset form after submission
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Contact Management</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            required
            className="input"
          />
        </div>
        <button
          type="submit"
          className="submit-button"
        >
          Add Contact
        </button>
      </form>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
