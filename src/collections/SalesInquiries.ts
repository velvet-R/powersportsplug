// src/collections/Quote.ts
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

    // Optional fields with defaults — completely safe for live database
    { name: 'shippingFee', type: 'number', defaultValue: 0 },
    { name: 'totalAmount', type: 'number', defaultValue: 0 },

    {
      name: 'products',
      type: 'array',
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
    {
      name: 'paymentPlan',
      type: 'select',
      label: 'Payment Plan',
      required: true,
      options: [
        { label: 'Full Payment (Outright)', value: 'full' },
        { label: 'Monthly Financing', value: 'financing' },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Preferred Payment Channel',
      required: true,
      options: [
        { label: 'Cash App', value: 'cash_app' },
        { label: 'Bank Transfer Wire', value: 'bank_transfer' },
        { label: 'Zelle', value: 'zelle' },
        { label: 'Chime', value: 'chime' },
        { label: 'Apple Pay', value: 'apple_pay' },
        { label: 'Bitcoin (BTC)', value: 'btc' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          // Compute fallback values safely if undefined
          const shipping = doc.shippingFee ?? 0
          const total = doc.totalAmount ?? 0

          await req.payload.sendEmail({
            to: 'tysonsmilton@gmail.com, sales@powersportsplug.com',
            // to: 'brandonichami@gmail.com',
            subject: `New Sales Inquiry from ${doc.customerName}`,
            html: `
              <h1>New Sales Inquiry</h1>
              <div style="background: #f4f4f4; padding: 10px; margin-bottom: 20px;">
                <p><strong>Payment Plan:</strong> ${doc.paymentPlan === 'full' ? 'Full Payment' : 'Monthly Financing'}</p>
                <p><strong>Method:</strong> ${doc.paymentMethod ? doc.paymentMethod.replace('_', ' ').toUpperCase() : 'N/A'}</p>
                <p><strong>Freight Shipping:</strong> $${shipping.toLocaleString()}</p>
                <p><strong>Estimated Total:</strong> $${total.toLocaleString()}</p>
              </div>
              <p><strong>Name:</strong> ${doc.customerName}</p>
              <p><strong>Email:</strong> ${doc.email}</p>
              <p><strong>Phone:</strong> ${doc.phone}</p>
              <p><strong>Location:</strong> ${doc.location}</p>
              <p><strong>Message:</strong> ${doc.message || 'N/A'}</p>
              <h2>Requested Products</h2>
              <table border="1" cellpadding="10" style="border-collapse: collapse;">
                <tr><th>Image</th><th>Product</th><th>Price</th><th>Down</th><th>Mo.</th></tr>
                ${doc.products
                  ?.map(
                    (p: any) => `
                  <tr>
                    <td><img src="${p.image && p.image.startsWith('http') ? p.image : 'https://powersportsplug.com' + (p.image || '')}" width="50" /></td>
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
