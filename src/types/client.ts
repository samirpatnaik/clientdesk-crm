// AI assisted development
export type ClientStatus = 'Lead' | 'Active' | 'Closed'

export interface Client {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: ClientStatus
  notes: string
  createdAt: string
  updatedAt: string
}

export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
