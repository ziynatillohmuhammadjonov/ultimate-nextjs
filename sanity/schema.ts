import { type SchemaTypeDefinition } from 'sanity'
import pet from './schemas/pet'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pet],
}
