import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const FinancingApplications: CollectionConfig = {
  slug: 'financing-applications',
  admin: {
    useAsTitle: 'lastName',
    group: 'Sales Management',
    defaultColumns: ['lastName', 'firstName', 'email', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can apply
    read: isAdmin, // Only Mr. Frank and your admins can view details
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Only trigger an email notification when a brand-new form submission hits the system
        if (operation === 'create') {
          try {
            await req.payload.sendEmail({
              to: 'velvetwoodruff8@gmail.com', // Your admin landing box address
              from: 'onboarding@resend.dev', // Use this temporary bypass string right now!
              subject: `🚨 New Financing Application Received: ${doc.firstName} ${doc.lastName}`,
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                  <h2 style="color: #E11D48; border-bottom: 2px solid #E11D48; padding-bottom: 10px;">
                    Financing Application Record Added
                  </h2>
                  <p><strong>Applicant Name:</strong> ${doc.firstName} ${doc.lastName}</p>
                  <p><strong>Email Address:</strong> ${doc.email}</p>
                  <p><strong>Phone Number:</strong> ${doc.phone}</p>
                  <p><strong>Desired Target Plan:</strong> ${doc.desiredPlan}</p>
                  <p><strong>Monthly Gross Income:</strong> $${doc.monthlyIncome}</p>
                  <p><strong>Employer:</strong> ${doc.employment}</p>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                  <p style="font-size: 11px; color: #777;">
                    Log into your Payload CMS control panel dashboard to view full identification metrics and SSN logs safely.
                  </p>
                </div>
              `,
            })
          } catch (error) {
            req.payload.logger.error(`Failed to send financing alert notification email: ${error}`)
          }
        }
      },
    ],
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'dob', type: 'text', required: true },
    { name: 'ssn', type: 'text', required: true, admin: { description: 'Last 2 digits only.' } },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'address', type: 'text', required: true },
    { name: 'city', type: 'text', required: true },
    { name: 'state', type: 'text', required: true },
    { name: 'zip', type: 'text', required: true },
    { name: 'residenceStatus', type: 'text', required: true },
    { name: 'employment', type: 'text', required: true },
    { name: 'monthlyIncome', type: 'text', required: true },
    { name: 'desiredPlan', type: 'text', required: true },
  ],
}
