// app//contact/[id]/route.js

let contacts = [
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
  ];
  
  export async function GET({ params }) {
    const { id } = params;
    const contact = contacts.find((contact) => contact.id === parseInt(id));
    if (contact) {
      return new Response(JSON.stringify(contact), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('Contact not found', { status: 404 });
  }
  
  export async function PUT(request, { params }) {
    const { id } = params;
    const { name, phone } = await request.json();
    const index = contacts.findIndex((contact) => contact.id === parseInt(id));
    if (index > -1) {
      contacts[index] = { id: parseInt(id), name, phone };
      return new Response(JSON.stringify(contacts[index]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('Contact not found', { status: 404 });
  }
  
  export async function DELETE({ params }) {
    const { id } = params;
    const index = contacts.findIndex((contact) => contact.id === parseInt(id));
    if (index > -1) {
      contacts.splice(index, 1);
      return new Response(null, { status: 204 });
    }
    return new Response('Contact not found', { status: 404 });
  }
  