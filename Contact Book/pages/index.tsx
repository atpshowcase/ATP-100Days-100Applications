import Link from 'next/link'
import { useContacts } from '../contexts/ContactsContext'

export default function Home() {
  const { contacts, loading } = useContacts()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Book</h1>
        <Link href="/contacts/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</Link>
      </header>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <ul className="space-y-4">
          {contacts.map((c) => (
            <li key={c.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
              <div>
                <Link href={`/contacts/${c.id}`} className="text-lg font-medium">{c.name}</Link>
                <div className="text-sm text-gray-500">{c.email} • {c.phone}</div>
              </div>
              <div className="space-x-2">
                <Link href={`/contacts/${c.id}/edit`} className="text-sm text-blue-600">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
