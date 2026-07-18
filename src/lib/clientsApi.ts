// AI assisted development
import seedClients from '@/data/seed-clients.json'
import type { Client, ClientInput } from '@/types/client'

const STORAGE_KEY = 'clientdesk_clients'
const LATENCY_MS = 280

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), LATENCY_MS)
  })
}

function readStore(): Client[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const seed = seedClients as Client[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
  try {
    return JSON.parse(raw) as Client[]
  } catch {
    const seed = seedClients as Client[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
}

function writeStore(clients: Client[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

function newId(): string {
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export const clientsApi = {
  async list(): Promise<Client[]> {
    return delay([...readStore()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)))
  },

  async get(id: string): Promise<Client> {
    const client = readStore().find((c) => c.id === id)
    if (!client) throw new Error('Client not found')
    return delay(client)
  },

  async create(input: ClientInput): Promise<Client> {
    const now = new Date().toISOString()
    const client: Client = {
      ...input,
      id: newId(),
      createdAt: now,
      updatedAt: now,
    }
    const next = [client, ...readStore()]
    writeStore(next)
    return delay(client)
  },

  async update(id: string, input: ClientInput): Promise<Client> {
    const store = readStore()
    const index = store.findIndex((c) => c.id === id)
    if (index < 0) throw new Error('Client not found')
    const updated: Client = {
      ...store[index],
      ...input,
      id,
      updatedAt: new Date().toISOString(),
    }
    const next = [...store]
    next[index] = updated
    writeStore(next)
    return delay(updated)
  },

  async remove(id: string): Promise<void> {
    const next = readStore().filter((c) => c.id !== id)
    if (next.length === readStore().length) {
      throw new Error('Client not found')
    }
    writeStore(next)
    await delay(undefined)
  },

  resetSeed(): void {
    writeStore(seedClients as Client[])
  },
}
