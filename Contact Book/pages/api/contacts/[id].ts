import type { NextApiRequest, NextApiResponse } from 'next'

// NOTE: This project is currently configured to use client-side localStorage for contacts.
// These API routes are disabled to avoid runtime errors when Prisma/SQLite is not configured.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(501).json({ error: 'Not implemented. This app is currently using client-side localStorage for contacts.' })
}
