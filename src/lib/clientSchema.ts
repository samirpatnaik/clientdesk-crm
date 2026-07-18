// AI assisted development
import { z } from 'zod'

export const clientStatuses = ['Lead', 'Active', 'Closed'] as const

export const clientFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email'),
  company: z.string().trim().min(1, 'Company is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  status: z.enum(clientStatuses),
  notes: z.string().trim(),
})

export type ClientFormValues = z.infer<typeof clientFormSchema>
