import { z } from 'zod';
import { UserSchema } from '../schemas/UserShema';

export type User = {
  id: string
  fullName: string
  document: string
  birthdate: Date
  email: string
  emailVerified: boolean
  mobile: string
  zipCode: string
  addressName: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export type TUserShema = z.infer<typeof UserSchema>