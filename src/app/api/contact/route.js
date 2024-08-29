// app/api/contact/route.js

let contacts = [
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
  ];
  
  export async function GET() {
    return new Response(JSON.stringify(contacts), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST(request) {
    const { name, phone } = await request.json();
    const newContact = { id: Date.now(), name, phone };
    contacts.push(newContact);
    return new Response(JSON.stringify(newContact), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  