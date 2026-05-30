// src/collections/QuoteRequests.ts
import { CollectionConfig } from 'payload'

export const SalesInquiries: CollectionConfig = {
  slug: 'sales-inquiries',
  admin: { useAsTitle: 'customerName', group: 'Quote' },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'customerName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
    {
      name: 'products',
      type: 'array', // Store the items requested
      fields: [
        { name: 'productTitle', type: 'text' },
        { name: 'productId', type: 'number' },
        { name: 'quantity', type: 'number' },

        { name: 'price', type: 'number' },
        { name: 'downPayment', type: 'number' },
        { name: 'estimatedPayment', type: 'number' },
        { name: 'image', type: 'text' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'contacted', 'closed'],
      defaultValue: 'new',
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          await req.payload.sendEmail({
            to: 'velvetwoodruff8@gmail.com',
            subject: `New Sales Inquiry from ${doc.customerName}`,
            html: `
              <h1>New Sales Inquiry</h1>
              <p><strong>Name:</strong> ${doc.customerName}</p>
              <p><strong>Email:</strong> ${doc.email}</p>
              <p><strong>Phone:</strong> ${doc.phone}</p>
              <p><strong>Location:</strong> ${doc.location}</p>
              <p><strong>Message:</strong> ${doc.message || 'N/A'}</p>
              <h2>Requested Products</h2>
              <table border="1" cellpadding="10">
                <tr><th>Image</th><th>Product</th><th>Price</th><th>Down</th><th>Mo.</th></tr>
                ${doc.products
                  .map(
                    (p) => `
                  <tr>
                    <td><img src="${p.image.startsWith('http') ? p.image : 'https://powersportsplug.com' + p.image}" width="50" /></td>
                    <td>${p.productTitle} (Qty: ${p.quantity})</td>
                    <td>$${p.price}</td>
                    <td>$${p.downPayment}</td>
                    <td>$${p.estimatedPayment}</td>
                  </tr>
                `,
                  )
                  .join('')}
              </table>`,
          })
        }
      },
    ],
  },
}
