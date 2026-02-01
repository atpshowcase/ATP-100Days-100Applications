import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useContacts, Contact } from '../../../contexts/ContactsContext'

export default function EditContact() {
  const router = useRouter()
  const { id } = router.query
  const { getContact, updateContact, deleteContact, loading } = useContacts()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contact, setContact] = useState<Contact | undefined>()

  useEffect(() => {
    if (!id) return
    const cid = parseInt(id as string)
    if (isNaN(cid)) return
    const c = getContact(cid)
    setContact(c)
    if (c) {
      setName(c.name)
      setEmail(c.email || '')
      setPhone(c.phone || '')
    }
  }, [id, loading])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!contact) return
    updateContact(contact.id, { name, email, phone })
    router.push(`/contacts/${contact.id}`)
  }

  async function handleDelete() {
    if (!contact) return
    deleteContact(contact.id)
    router.push('/')
  }

  if (loading) return <div className="p-6">Loading…</div>
  if (!contact) return <div className="p-6">Not found</div>

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Contact</h1>
      <form onSubmit={handleSave} className="space-y-4">
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
          <button type="button" onClick={handleDelete} className="px-4 py-2 rounded border text-red-600">Delete</button>
        </div>
      </form>
    </main>
  )
}
