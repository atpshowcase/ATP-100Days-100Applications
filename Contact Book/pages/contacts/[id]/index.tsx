import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useContacts, Contact } from '../../../contexts/ContactsContext'

export default function ContactPage() {
  const router = useRouter()
  const { id } = router.query
  const { getContact, loading } = useContacts()
  const [contact, setContact] = useState<Contact | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    const cid = parseInt(id as string)
    if (isNaN(cid)) return
    setContact(getContact(cid))
  }, [id, loading])

  if (loading) return <div className="p-6">Loading…</div>
  if (!contact) return <div className="p-6">Not found</div>

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{contact.name}</h1>
      <p className="text-gray-600">{contact.email} • {contact.phone}</p>
      <div className="mt-4 space-x-2">
        <Link href={`/contacts/${contact.id}/edit`} className="text-blue-600">Edit</Link>
      </div>
    </main>
  )
}
