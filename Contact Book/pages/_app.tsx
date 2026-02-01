import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContactsProvider } from '../contexts/ContactsContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContactsProvider>
      <Component {...pageProps} />
    </ContactsProvider>
  )
}
