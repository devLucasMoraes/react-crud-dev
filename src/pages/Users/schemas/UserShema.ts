import { z } from 'zod';

export const UserSchema = z.object({
  fullName: z.string().nonempty('Este campo é obrigatório'),
  document: z.string().nonempty('Este campo é obrigatório'),
  birthDate: z.date().optional(),
  email: z
    .string()
    .email('E-mail não reconhecido')
    .nonempty('Este campo é obrigatório'),
  emailVerified: z.boolean().default(false),
  mobile: z.string().nonempty('Este campo é obrigatório'),
  zipCode: z
    .string()
    .nonempty('Este campo é obrigatório')
    .transform((value) => value.replace(/[^\d]+/g, '')),
  addressName: z.string().nonempty('Este campo é obrigatório'),
  number: z.string().nonempty('Este campo é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().nonempty('Este campo é obrigatório'),
  city: z.string().nonempty('Este campo é obrigatório'),
  state: z.string().nonempty('Este campo é obrigatório'),
});