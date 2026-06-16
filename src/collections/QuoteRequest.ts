import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'lastName',
    group: 'Sales Management',
    defaultColumns: ['lastName', 'firstName', 'category', 'createdAt'],
  },
  access: {
    create: () => true, // Allows public leads to request quotes
    read: isAdmin, // Locks access downstream to Mr. Frank and admin staff
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            await req.payload.sendEmail({
              to: 'tysonsmilton@gmail.com, sales@powersportsplug.com',
              from: 'sales@powersportsplug.com', // Continuous verification bypass
              subject: `🔥 New Free Quote Request [${doc.category}]: ${doc.firstName} ${doc.lastName}`,
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                  <h2 style="color: #FF4500; border-bottom: 2px solid #333; padding-bottom: 10px; text-transform: uppercase;">
                    Lead Capture: Free Quote Requested
                  </h2>
                  <p><strong>Name:</strong> ${doc.firstName} ${doc.lastName}</p>
                  <p><strong>Contact:</strong> ${doc.phone} | ${doc.email}</p>
                  <p><strong>Location State:</strong> ${doc.state}</p>
                  <p><strong>Category:</strong> ${doc.category}</p>
                  <p><strong>Brand Preference:</strong> ${doc.brand}</p>
                  <p><strong>Budget Target:</strong> ${doc.budget}</p>
                  <p><strong>Financing Required:</strong> ${doc.financing === 'yes' ? 'Yes (No Credit Check Needed)' : doc.financing}</p>
                  <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #FF4500; margin-top: 15px;">
                    <p style="margin: 0; font-weight: bold;">Additional Client Notes:</p>
                    <p style="margin: 5px 0 0 0; line-height: 1.5;">${doc.notes || 'No added details provided.'}</p>
                  </div>
                </div>
              `,
            })
          } catch (error) {
            req.payload.logger.error(
              `Failed to send free quote warning notification email: ${error}`,
            )
          }
        }
      },
    ],
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'state', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'brand', type: 'text', required: true },
    { name: 'budget', type: 'text', required: true },
    { name: 'financing', type: 'text', required: true },
    { name: 'notes', type: 'textarea' },
  ],
}
