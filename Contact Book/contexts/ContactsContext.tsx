import React, { createContext, useContext, useEffect, useState } from 'react'

export type Contact = {
  id: number
  name: string
  email?: string
  phone?: string
  createdAt?: string
}

type ContactsContextValue = {
  contacts: Contact[]
  loading: boolean
  addContact: (data: { name: string; email?: string; phone?: string }) => Contact
  updateContact: (id: number, data: Partial<Contact>) => Contact | undefined
  deleteContact: (id: number) => void
  getContact: (id: number) => Contact | undefined
}

const LOCAL_KEY = 'contact_book_contacts_v1'
const seedData: Contact[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', createdAt: new Date().toISOString() },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-0202', createdAt: new Date().toISOString() },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', phone: '555-0303', createdAt: new Date().toISOString() },
]

const ContactsContext = createContext<ContactsContextValue | undefined>(undefined)

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const raw = localStorage.getItem(LOCAL_KEY)
      if (!raw) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(seedData))
        setContacts(seedData)
      } else {
        setContacts(JSON.parse(raw))
      }
    } catch (e) {
      console.error('Failed to load contacts from localStorage', e)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }, [])

  function persist(list: Contact[]) {
    setContacts(list)
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to persist contacts', e)
    }
  }

  function nextId(list: Contact[]) {
    const max = list.reduce((acc, c) => Math.max(acc, c.id || 0), 0)
    return max + 1
  }

  function addContact(data: { name: string; email?: string; phone?: string }) {
    const list = [...contacts]
    const contact: Contact = {
      id: nextId(list),
      name: data.name,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    }
    persist([contact, ...list])
    return contact
  }

  function updateContact(id: number, data: Partial<Contact>) {
    const list = contacts.map((c) => (c.id === id ? { ...c, ...data } : c))
    persist(list)
    return list.find((c) => c.id === id)
  }

  function deleteContact(id: number) {
    const list = contacts.filter((c) => c.id !== id)
    persist(list)
  }

  function getContact(id: number) {
    return contacts.find((c) => c.id === id)
  }

  return (
    <ContactsContext.Provider value={{ contacts, loading, addContact, updateContact, deleteContact, getContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
  const ctx = useContext(ContactsContext)
  if (!ctx) throw new Error('useContacts must be used within ContactsProvider')
  return ctx
}
