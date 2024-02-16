import {Rule} from 'sanity'

// schemas/pet.js
export default {
  name: 'post',
  type: 'array',
  title: 'Post',
  fields: [
    {
      name: 'meta_title',
      type: 'string',
      title: 'Meta title'
    }
  ],
  validation: (Rule:Rule) => Rule.required().error("To'ldiring"),
}