import { type SchemaTypeDefinition } from 'sanity'
import pet from './schemas/pet'
import arr from './schemas/arr'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pet, arr],
}
