import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

// Mock fetch
beforeAll(() => {
  ;(global as any).fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([{ id: 1, name: 'Test', email: 'a@b.com', phone: '123' }]) })
  )
})

test('renders contact list', async () => {
  render(<Home />)
  expect(await screen.findByText('Test')).toBeInTheDocument()
})
