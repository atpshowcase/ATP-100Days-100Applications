import { useRouter } from 'next/router'
import { useState } from 'react'
import { useContacts } from '../../contexts/ContactsContext'

export default function NewContact() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const { addContact } = useContacts()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addContact({ name, email, phone })
    router.push('/')
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Add Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </main>
  )
}
