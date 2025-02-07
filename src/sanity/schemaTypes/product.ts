import { defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Product ID',
      type: 'string',
      description: 'Unique identifier for the product',
      validation: Rule => Rule.required().min(3).max(50),
    },
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'The name of the product',
      validation: Rule => Rule.required().min(3).max(100),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true, // Allow image cropping
      },
      description: 'Main image of the product',
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the product in the selected currency',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the product',
      validation: Rule => Rule.required().min(10).max(1000),
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount applied to the product (in percentage)',
      validation: Rule => Rule.min(0).max(100),
    },
    {
      name: 'isFeaturedProduct',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Whether the product is featured on the homepage or not',
      initialValue: false,
    },
    {
      name: 'stockLevel',
      title: 'Stock Level',
      type: 'number',
      description: 'Current stock level of the product',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category the product belongs to (e.g., Electronics, Furniture)',
      validation: Rule => Rule.required(),
    },
  ],
});
