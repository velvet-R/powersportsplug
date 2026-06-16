import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  admin: {
    useAsTitle: 'lastName',
    group: 'Sales Management',
    defaultColumns: ['lastName', 'firstName', 'interest', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit a message
    read: isAdmin, // Only admins can read, update, or delete entries
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            await req.payload.sendEmail({
              to: 'tysonsmilton@gmail.com, sales@powersportsplug.com', // Admin destination email
              from: 'sales@powersportsplug.com', // Using the stable bypass address for now
              subject: `📩 New Contact Inquiry [${doc.interest.toUpperCase()}]: ${doc.firstName} ${doc.lastName}`,
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                  <h2 style="color: #FF4500; border-bottom: 2px solid #333; padding-bottom: 10px; text-transform: uppercase;">
                    General Contact Request Received
                  </h2>
                  <p><strong>Name:</strong> ${doc.firstName} ${doc.lastName}</p>
                  <p><strong>Email:</strong> ${doc.email}</p>
                  <p><strong>Phone:</strong> ${doc.phone}</p>
                  <p><strong>Location:</strong> ${doc.cityState}</p>
                  <p><strong>Allocation Type / Interest:</strong> ${doc.interest}</p>
                  <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #FF4500; margin-top: 15px;">
                    <p style="margin: 0; font-weight: bold;">Message Details:</p>
                    <p style="margin: 5px 0 0 0; line-height: 1.5;">${doc.message}</p>
                  </div>
                </div>
              `,
            })
          } catch (error) {
            req.payload.logger.error(`Failed to send contact inquiry alert email: ${error}`)
          }
        }
      },
    ],
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'cityState', type: 'text', required: true },
    { name: 'interest', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
  ],
}
